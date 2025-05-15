'use server';

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import FuentepediaLogo from '@/app/ui/fuentepedia-logo';
import { LogOutButton } from '@/app/ui/dashboard/sidenav-logoutbutton';
import { UserInfoButton } from '@/app/ui/dashboard/sidenav-userbuttons';
import { LoginButton } from '@/app/ui/dashboard/sidenav-loginbutton';
import { AdminMenuButton } from './sidenav-admingestionmenu';
import { EditorMenuButton } from './sidenav-editorgestionmenu';
import { RegisterButton } from './sidenav-registerbutton';
import { auth } from '@/auth';
import { getUserAdmin, getUserEditor } from '@/app/lib/data/users.data';

export default async function SideNav() {
  const session = await auth();

  const admin = await getUserAdmin();
  const editor = await getUserEditor();
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <button className="">
        <FuentepediaLogo />
      </button>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          {editor && <EditorMenuButton />}
          {admin && <AdminMenuButton />}
        </div>
        <div>
          {session?.user?.id ? (
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
