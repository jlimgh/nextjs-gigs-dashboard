import Form from '@/app/ui/gigs/edit-form';
import Breadcrumbs from '@/app/ui/gigs/breadcrumbs';
import { fetchGigById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { formatDateToLocal } from '@/app/lib/utils';
 
export const metadata: Metadata = {
  title: 'Post Detail',
};
 
export default async function Page({ params }:{ params: { countyId: string, regionId: string, id: string } }) {
  const countyId = params.countyId;
  const regionId = params.regionId;
  const id = params.id;
  const gig = await fetchGigById(id)

  console.log('fetched gig: ', gig);

  if (!gig) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Locations', href: '/' },
          {
            label: countyId,
            href: `/search/${countyId}`,
          },
          {
            label: regionId,
            href: `/search/${countyId}/${regionId}`,
          },
          {
            label: 'Post Details',
            href: `/search/${countyId}/${regionId}/${id}`,
            active: true,
          }
        ]}
      />

        <div className="rounded-md bg-gray-50 p-4 md:p-6">
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">{gig.title}</h3>
                <button
                    className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"

                >
                    Reply
                </button>
                {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p> */}
            </div>
            <div className="mt-6 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Date</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{gig.end_date ? formatDateToLocal(gig.end_date) : '-'}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Completed By</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{gig.end_date ? formatDateToLocal(gig.end_date) : '-'}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Location</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{regionId}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Compensation</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{gig.amount}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Details</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{gig.details}</dd>
                    </div>
                </dl>
            </div>
            
        </div>
    </main>
  );
}

