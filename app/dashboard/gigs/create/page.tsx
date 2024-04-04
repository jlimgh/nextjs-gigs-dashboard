import Form from '@/app/ui/gigs/create-form';
import Breadcrumbs from '@/app/ui/gigs/breadcrumbs';
import { fetchWorkers } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create new gig',
};
 
export default async function Page() {
  const workers = await fetchWorkers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Gigs', href: '/dashboard/gigs' },
          {
            label: 'Create Gig',
            href: '/dashboard/gigs/create',
            active: true,
          },
        ]}
      />
      <Form workers={workers} />
    </main>
  );
}