'use client';
import {
  Bars3Icon,
  UsersIcon,
  MapPinIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import path from 'path';
import { useEffect, useState } from 'react';

export function AdminMenuButton() {
  const pathname = usePathname();
  const [abrirMenu, setAbrirMenu] = useState(false);

  useEffect(() => {
    if (pathname.startsWith('/dashboard/admin')) {
      setAbrirMenu(true);
    }
  }, [])
  return (
    <div>
      {abrirMenu ? (
        <button
          id="admin-menu-button"
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-sky-300 p-3 text-sm font-medium text-blue-800  hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          onClick={() => setAbrirMenu(!abrirMenu)}
        >
          <Bars3Icon className="w-6" />
          <p>Gestión</p>
        </button>
      ) : (
        <button
          id="admin-menu-button"
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          onClick={() => setAbrirMenu(!abrirMenu)}
        >
          <Bars3Icon className="w-6" />
          <p>Gestión</p>
        </button>
      )}

      {abrirMenu && (
        <div>
          <Link
            href="/dashboard/admin/users"
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
                ${pathname === '/dashboard/admin/users' ? 'bg-sky-100 text-blue-600' : ''}
                `}
          >
            <UsersIcon className="w-6" />
            <p>Gestionar usuarios</p>
          </Link>
          <Link
            href="/dashboard/admin/ubicaciones"
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
                ${pathname === '/dashboard/admin/ubicaciones' ? 'bg-sky-100 text-blue-600' : ''}
                `}
          >
            <MapPinIcon className="w-6" />
            <p>Gestionar ubicaciones</p>
          </Link>
          <Link
            href="/dashboard/admin/fuentes"
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
                ${pathname === '/dashboard/admin/fuentes' ? 'bg-sky-100 text-blue-600' : ''}
                `}
          >
            <UsersIcon className="w-6" />
            <p>Gestionar fuentes</p>
          </Link>
          <Link
            href="/dashboard/admin/comentarios"
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
                ${pathname === '/dashboard/admin/comentarios' ? 'bg-sky-100 text-blue-600' : ''}
                `}
          >
            <ChatBubbleLeftEllipsisIcon className="w-6" />
            <p>Gestionar comentarios</p>
          </Link>
        </div>
      )}
    </div>
  );
}
