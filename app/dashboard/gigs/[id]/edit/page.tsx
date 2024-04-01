import Form from '@/app/ui/gigs/edit-form';
import Breadcrumbs from '@/app/ui/gigs/breadcrumbs';
import { fetchGigById, fetchWorkers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }:{ params: { id: string } }) {
  const id = params.id;
  const [gig, workers] = await Promise.all([
    fetchGigById(id),
    fetchWorkers(),
  ]);

  if (!gig) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Gigs', href: '/dashboard/gigs' },
          {
            label: 'Edit Gig',
            href: `/dashboard/gigs/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form gig={gig} workers={workers} />
    </main>
  );
}