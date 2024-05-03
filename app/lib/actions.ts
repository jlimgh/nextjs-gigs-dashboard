'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { auth } from '@/auth';

const FormSchema = z.object({
    id: z.string(),
    title: z.string({
        invalid_type_error: 'Please enter title'
    }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0'}),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select a gig status'
    }),
    date: z.string(),
    details: z.string({
        invalid_type_error: 'Please enter details'
    }),
    worker_name: z.string().optional(),
    user_id: z.string()
  });

const CreateGig = FormSchema.omit({ id: true, date: true, user_id: true });
const UpdateGig = FormSchema.omit({ id: true, date: true, user_id: true });

export type State = {
    errors?: {
      title?: string[];
      amount?: string[];
      status?: string[];
      details?: string[];
      worker_name?: string[]
    };
    message?: string | null;
  };

export async function createGig(prevState: State, formData: FormData) {
    const session = await auth();
    const user_id = session?.token.sub;

    const validatedFields = CreateGig.safeParse({
        title: formData.get('title'),
        amount: formData.get('amount'),
        status: formData.get('status'),
        details: formData.get('details'),
        worker_name: formData.get('worker_name')
    });

    console.log('validedFields:' , validatedFields);

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        console.log('validatedField error: ', validatedFields.error)
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Gig.',
        };
    }

    // Prepare data for insertion into the database
    const { title, amount, status, details, worker_name } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
            INSERT INTO gigs (title, amount, status, date, user_id, details, worker_name)
            VALUES (${title}, ${amountInCents}, ${status}, ${date}, ${user_id}, ${details}, ${worker_name})
        `;
    } catch (error) {
        console.log('db error: ', error)
        return {
            message: 'Database error: Failed to create gig'
        }
    }

    revalidatePath('/dashboard/gigs');
    redirect('/dashboard/gigs');
}

export async function updateGig(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateGig.safeParse({
      title: formData.get('title'),
      amount: formData.get('amount'),
      status: formData.get('status'),
      details: formData.get('details'),
      worker_name: formData.get('worker_name')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Gig.',
        };
    }
    
    const { title, amount, status, details, worker_name } = validatedFields.data;
    const amountInCents = amount * 100;
   
    try {
        await sql`
            UPDATE gigs
            SET title = ${title}, amount = ${amountInCents}, status = ${status}, details = ${details}, worker_name = ${worker_name}
            WHERE id = ${id}
        `;
    } catch (error) {
        return {
            message: 'Database error: Failed to update gig'
        }
    }
   
    revalidatePath('/dashboard/gigs');
    redirect('/dashboard/gigs');
}

export async function deleteGig(id: string) {
    throw new Error('Failed to Delete Invoice');
    try {
        await sql`DELETE FROM gigs WHERE id = ${id}`;
        revalidatePath('/dashboard/gigs');
    } catch (error) {
        return {
            message: 'Database error: Failed to delete gig'
        }
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }