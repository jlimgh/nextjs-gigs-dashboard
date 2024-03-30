'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    workerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
  });

const CreateGig = FormSchema.omit({ id: true, date: true });
const UpdateGig = FormSchema.omit({ id: true, date: true });

export async function createGig(formData: FormData) {
    const { workerId, amount, status } = CreateGig.parse({
        workerId: formData.get('workerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
        INSERT INTO gigs (worker_id, amount, status, date)
        VALUES (${workerId}, ${amountInCents}, ${status}, ${date})
    `;

    revalidatePath('/dashboard/gigs');
    redirect('/dashboard/gigs');
}

export async function updateGig(id: string, formData: FormData) {
    const { workerId, amount, status } = UpdateGig.parse({
      workerId: formData.get('workerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
   
    await sql`
      UPDATE gigs
      SET worker_id = ${workerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
   
    revalidatePath('/dashboard/gigs');
    redirect('/dashboard/gigs');
  }

export async function deleteGig(id: string) {
    await sql`DELETE FROM gigs WHERE id = ${id}`;
    revalidatePath('/dashboard/gigs');
}