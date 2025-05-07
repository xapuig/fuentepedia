'use client';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function UserInfoButton() {
  return (
    <div>
      <Link className="hidden md:block" href="/dashboard/panel-usuario">
        <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <UserCircleIcon className="w-6" />
          Usuario
        </button>
      </Link>
    </div>
  );
}
