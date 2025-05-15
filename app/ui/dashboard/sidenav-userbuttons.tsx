'use client';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const href = '/dashboard/panel-usuario';
export function UserInfoButton() {
  const pathname = usePathname();
  return (
    <div>
      <Link
        className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
                ${pathname === href ? 'bg-sky-100 text-blue-600' : ''}
                `}
        href="/dashboard/panel-usuario"
      >
        <UserCircleIcon className="w-6" />
        <p className="hidden md:block">Usuario</p>
      </Link>
    </div>
  );
}
