import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AppLogo from '@/app/ui/app-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import clsx from 'clsx';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="flex h-20 justify-start rounded-t-md bg-cyan-800 p-4 md:h-32"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AppLogo />
        </div>
      </Link>
      <div
          className={clsx(
            "h-[70px] hidden gap-2 mb-2 border-solid border border-cyan-800 rounded-b-md bg-gray-50 p-3 text-sm font-medium md:p-2 md:px-3 md:block",
          )}
        >
          {/* <LinkIcon className="w-6" /> */}
          <p className="">Jefferson Lim</p>
          <p className="text-xs">Since Dec. 2023</p>
        </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form action={async () => {
            'use server';
            await signOut();
          }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
