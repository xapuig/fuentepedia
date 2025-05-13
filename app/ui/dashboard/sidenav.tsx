'use server';

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import FuentepediaLogo from '@/app/ui/fuentepedia-logo';
import { LogOutButton } from '@/app/ui/dashboard/sidenav-logoutbutton';
import { UserInfoButton } from '@/app/ui/dashboard/sidenav-userbuttons';
import { LoginButton } from '@/app/ui/dashboard/sidenav-loginbutton';
import { RegisterButton } from './sidenav-registerbutton';
import { auth } from '@/auth';

export default async function SideNav() {
  const session = await auth();
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <button className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40">
        <FuentepediaLogo />
      </button>
      <Link className="" href="/"></Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div>
          {session ? (
            <div>
              <UserInfoButton />
              <LogOutButton />
            </div>
          ) : (
            <div>
              <LoginButton />
              <RegisterButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
