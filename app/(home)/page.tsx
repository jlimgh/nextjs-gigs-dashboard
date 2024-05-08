import AcmeLogo from '@/app/ui/app-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '../ui/fonts';
import Image from 'next/image';
import SideNav from '../ui/home/sidenav';
import Breadcrumbs from '../ui/gigs/breadcrumbs';

export default function Page() {
  const links = {
    la: [
      {
        name: 'All Los Angeles',
        href: '/search/la/all'
      },
      {
        name: 'Westside LA',
        href: '/search/la/westla'
      },
      {
        name: 'Southside Torrance',
        href: '/search/la/southtorrance'
      },
      {
        name: 'Long Beach',
        href: '/search/la/lb'
      },{
        name: 'San Gabriel Valley',
        href: '/search/la/sgv'
      }
    ]
  }
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Locations', href: '/', active: true },
        ]}
      />
      <div className="mb-3">
        <h3 className="text-lg">Los Angeles</h3>
        <ul>
        {links.la.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
              >
                <li className="">{link.name}</li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="mb-3">
        <h3 className="text-lg">Orange County</h3>
        <ul>
          <li>Newport</li>
          <li>Westminster</li>
          <li>Laguna</li>
          <li>Irvine</li>
          <li>HB</li>
        </ul>
      </div>
      <div className="mb-3">
        <h3 className="text-lg">Riverside</h3>
        <ul>
          <li>Westside LA</li>
          <li>Southside Torrance</li>
          <li>The Valley</li>
          <li>Long Beach</li>
          <li>San Gabriel Valley</li>
        </ul>
      </div>
    </main>
  );
}
