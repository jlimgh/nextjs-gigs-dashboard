import Form from '@/app/ui/gigs/edit-form';
import Breadcrumbs from '@/app/ui/gigs/breadcrumbs';
import { fetchGigById, fetchWorkers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'County Search',
};
 
export default async function Page({ params }:{ params: { countyId: string } }) {
  const countyId = params.countyId;
//   console.log('countyId: ', countyId);
//   const [gig, workers] = await Promise.all([
//     fetchGigById(id),
//     fetchWorkers(),
//   ]);

//   if (!gig) {
//     notFound();
//   }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Locations', href: '/' },
          {
            label: countyId,
            href: `/search/${countyId}`,
            active: true,
          }
        ]}
      />

      Test County Page
      {/* <Form gig={gig} workers={workers} /> */}
    </main>
  );
}