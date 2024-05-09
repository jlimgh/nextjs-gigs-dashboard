'use client'

import { WorkerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createGig } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ workers }: { workers: WorkerField[] }) {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createGig, initialState);

  const countyList = [
    {
      name: 'Los Angeles',
      id: 'la'
    },
    {
      name: 'Orange County',
      id: 'oc'
    },
    {
      name: 'Riverside',
      id: 'riverside'
    }
  ]

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {/* Title */}
        <div className="col-span-full">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Choose a title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="gig-title-error"
              />
            </div>
          </div>
          <div id="gig-amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* County */}
        <div className="sm:col-span-3">
          <label htmlFor="county" className="mb-2 block text-sm font-medium">
            Choose county
          </label>
          <div className="relative">
            <select
              id="county"
              name="county"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="county-error"
            >
              <option value="" disabled>
                Select a county
              </option>
              {countyList.map((county) => (
                <option key={county.id} value={county.id}>
                  {county.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="county-error" aria-live="polite" aria-atomic="true">
            {state.errors?.county &&
              state.errors.county.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* City */}
        <div className="sm:col-span-3">
          <label htmlFor="county" className="mb-2 block text-sm font-medium">
            Choose City Placeholder
          </label>
          <div className="relative">
            <select
              id="county"
              name="county"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="county-error"
            >
              <option value="" disabled>
                Select a county
              </option>
              {countyList.map((county) => (
                <option key={county.id} value={county.id}>
                  {county.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="county-error" aria-live="polite" aria-atomic="true">
            {state.errors?.county &&
              state.errors.county.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Gig Amount */}
        <div className="sm:col-span-3">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="gig-amount-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="gig-amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Worker Name */}
        <div className="sm:col-span-3">
          <label htmlFor="worker_name" className="mb-2 block text-sm font-medium">
            Worker name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="worker_name"
                name="worker_name"
                type="text"
                placeholder="Optional Worker name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="gig-worker_name-error"
              />
            </div>
          </div>
        </div>

         {/* Details */}
         <div className="col-span-full">
          <label htmlFor="details" className="mb-2 block text-sm font-medium">
            Summary
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="details"
                name="details"
                rows={4}
                placeholder="Enter details"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="gig-details-error"
              />
            </div>
          </div>
          <div id="gig-amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.details &&
              state.errors.details.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Gig Status */}
        <div className="">
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the gig status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="gig-status-error"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="gig-status-error"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        </div>
        <div id="gig-status-error" aria-live="polite" aria-atomic="true">
          {state.errors?.status &&
            state.errors.status.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <div aria-live="polite" aria-atomic="true">
          {state.message &&
           <p className="mt-2 text-sm text-red-500">
            { state.message }
           </p>
           }
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/gigs"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Gig</Button>
      </div>
    </form>
  );
}
