'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    workerId: z.string({
        invalid_type_error: 'Please select worker'
    }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0'}),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select a gig status'
    }),
    date: z.string(),
  });

const CreateGig = FormSchema.omit({ id: true, date: true });
const UpdateGig = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
      workerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
  };

export async function createGig(prevState: State, formData: FormData) {
    const validatedFields = CreateGig.safeParse({
        workerId: formData.get('workerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Gig.',
        };
    }

    // Prepare data for insertion into the database
    const { workerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
            INSERT INTO gigs (worker_id, amount, status, date)
            VALUES (${workerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
        return {
            message: 'Database error: Failed to create gig'
        }
    }

    revalidatePath('/dashboard/gigs');
    redirect('/dashboard/gigs');
}

export async function updateGig(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateGig.safeParse({
      workerId: formData.get('workerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Gig.',
        };
    }
    
    const { workerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
   
    try {
        await sql`
            UPDATE gigs
            SET worker_id = ${workerId}, amount = ${amountInCents}, status = ${status}
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