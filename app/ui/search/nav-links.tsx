'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useParams } from 'next/navigation'

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'County Select', href: '/', icon: HomeIcon },
  {
    name: 'Region Select',
    href: '/about',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Gig Select', href: '/categories', icon: UserGroupIcon },
];

const regionData = {
    la: {
        name: 'Los Angeles',
        cities: [
            {
                key: 'lb',
                name: 'Long Beach'
            },
            {
                key: 'sgv',
                name: 'San Gabriel Valley'
            },
            {
                key: 'westla',
                name: 'West Los Angeles'
            }
        ]
    },
    oc: {
        name: 'Orange County',
        cities: [
            {
                key: 'laguna',
                name: 'Laguna Beach'
            },
            {
                key: 'irvine',
                name: 'Irvine'
            },
            {
                key: 'westmin',
                name: 'Westminster'
            }
        ]
    }
}

export default function NavLinks() {

  const pathname = usePathname();
  const params = useParams<{ countyId: keyof typeof regionData; regionId: string }>();
    const countyOptions = Object.keys(regionData).map(key => ({
        key: key,
        name: regionData[key as keyof typeof regionData].name
    }));
    let selectedCounty: { key: string; name: string } | undefined;
    let regionOptions: { key: string; name: string }[] | undefined;
    let selectedRegion: { key: string; name: string } | undefined;

    console.log('useParams: ', params);
    console.log('usePathname: ', pathname);
    console.log('county options: ', countyOptions);

    if (params.countyId && regionData[params.countyId]) {
        selectedCounty = countyOptions.find(county => county.key === params.countyId);
        console.log("selectedCounty: ", selectedCounty);

        regionOptions = regionData[params.countyId].cities.map(region => ({
            key: region.key,
            name: region.name
        }));
        console.log('regionOptions: ', regionOptions);

        if (params.regionId && regionData[params.countyId].cities) {
            selectedRegion = regionData[params.countyId].cities.find(region => region.key === params.regionId);
            console.log('selectedRegion: ', selectedRegion);
        } else {
            console.log('inside no region param....')
            selectedRegion = {
                name: "",
                key: ""
            }
            console.log('selectedRegion wity no region id: ', selectedRegion);
        }
    }



  return (
    <>
      <form className="flex md:block gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium md:p-2 md:px-3">
        <div className="mb-2">
            <label htmlFor="county-filter" className="mb-1 block text-sm font-medium">
                County
            </label>
            <select
                id="county-filter"
                name="county-filter"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 mb-2"
                defaultValue={selectedCounty?.key || ""}
                aria-describedby="county-filter-error"
            >
                <option value="" disabled>
                    Select a county
                </option>
                {countyOptions.map((county) => (
                <option key={county.key} value={county.key}>
                    {county.name}
                </option>
                    ))}
            </select>
        </div>
        <div>
            <label htmlFor="region-filter" className="mb-1 block text-sm font-medium">
                Region
            </label>
            <select
                id="region-filter"
                name="region-filter"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 mb-2"
                defaultValue={selectedRegion?.key || ""}
                aria-describedby="region-filter-error"
            >
                <option value="" disabled>
                    Select a region
                </option>
                {regionOptions?.map((region) => (
                <option key={region.key} value={region.key}>
                    {region.name}
                </option>
                    ))}
            </select>
        </div>
      </form>
      {/* {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })} */}
    </>
  );
}