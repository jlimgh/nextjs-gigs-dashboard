import Form from '@/app/ui/gigs/edit-form';
import Breadcrumbs from '@/app/ui/gigs/breadcrumbs';
import { fetchGigById, fetchPublicGigPosts, fetchPublicGigPostsPages, fetchWorkers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Pagination from '@/app/ui/gigs/pagination';
import { lusitana } from '@/app/ui/fonts';
import { GigsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import GigStatus from '@/app/ui/gigs/status';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';
import Link from 'next/link';
 
export const metadata: Metadata = {
  title: 'Update gig',
};
 
export default async function Page({ params, searchParams }:{ params: { countyId: string, regionId: string }, searchParams: { page?: string} }) {
  const countyId = params.countyId;
  const regionId = params.regionId;

  const currentPage = Number(searchParams?.page) || 1;
  const gigs = await fetchPublicGigPosts(countyId, currentPage, regionId);
  const totalPages = await fetchPublicGigPostsPages(countyId, regionId);
  console.log('gigs posts in public la/lb: ', gigs);
  console.log('totalPages: ', totalPages);
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
          },
          {
            label: regionId,
            href: `/search/${countyId}/${regionId}`,
            active: true,
          },
        ]}
      />

      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Gigs</h1>
        </div>
        <Suspense key={countyId + regionId + currentPage} fallback={<GigsTableSkeleton />}>
          <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
              <div className="">
                <div className="md:hidden">
                  {gigs?.map((gig) => (
                    <div
                      key={gig.id}
                      className="mb-2 w-full rounded-md bg-white p-4"
                    >
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <div className="mb-2 flex items-center">
                            {/* <Image
                              src={gig.image_url}
                              className="mr-2 rounded-full"
                              width={28}
                              height={28}
                              alt={`${gig.name}'s profile picture`}
                            /> */}
                            <p>{gig.title}</p>
                          </div>
                          <p className="text-sm text-gray-500">{gig.email}</p>
                        </div>
                        <GigStatus status={gig.status} />
                      </div>
                      <div className="flex w-full items-center justify-between pt-4">
                        <div>
                          <p className="text-xl font-medium">
                            {formatCurrency(gig.amount)}
                          </p>
                          <p>{formatDateToLocal(gig.date)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hidden min-w-full text-gray-900 md:block">
                  <div className="">
                    {gigs.map((gig) => (
                      
                        <Link key={gig.id} href={`/search/${countyId}/${regionId}/${gig.id}`}>
                          <>
                          <div className="flex flex-row justify-between gap-x-6 py-4 rounded-lg bg-gray-50 px-4 mb-2">
                            <div className="basis-1/2 min-w-0 gap-x-4">
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{gig.title}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{formatDateToLocal(gig.date)}</p>
                              </div>
                            </div>
                            <div className="basis-1/4 min-w-0 gap-x-4">
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{formatCurrency(gig.amount)}</p>
                              </div>
                            </div>
                            <div className="hidden basis-1/4 shrink-0 sm:flex sm:flex-col sm:items-end">
                              <p className="text-sm leading-6 text-gray-900">{gig.region}</p>
                              <p className="mt-1 text-xs leading-5 text-gray-500">Last seen</p>
                            </div>
                          </div>
                          </>
                        </Link>
                      
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}