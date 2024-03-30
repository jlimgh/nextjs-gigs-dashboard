import Pagination from '@/app/ui/gigs/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/gigs/table';
import { CreateGig } from '@/app/ui/gigs/buttons';
import { lusitana } from '@/app/ui/fonts';
import { GigsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchGigsPages } from '@/app/lib/data';
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchGigsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Gigs</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search gigs..." />
        <CreateGig />
      </div>
       <Suspense key={query + currentPage} fallback={<GigsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}