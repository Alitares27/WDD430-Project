'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/school-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';

export default function SideNav() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex h-full flex-col">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-cyan-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-50">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <button
          onClick={handleSignOut}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-red-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-red-900 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
}
