import Image from 'next/image';
import { UpdateGig, DeleteGig } from '@/app/ui/gigs/buttons';
import GigStatus from '@/app/ui/gigs/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredGigs } from '@/app/lib/data';

export default async function GigsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const gigs = await fetchFilteredGigs(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
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
                      <p>{gig.name}</p>
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
                  <div className="flex justify-end gap-2">
                    <UpdateGig id={gig.id} />
                    <DeleteGig id={gig.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Worker
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {gigs?.map((gig) => (
                <tr
                  key={gig.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{gig.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {gig.worker_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(gig.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(gig.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <GigStatus status={gig.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateGig id={gig.id} />
                      <DeleteGig id={gig.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
