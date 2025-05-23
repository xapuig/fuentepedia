import { UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
export function LoginButton() {
  return (
    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
      <Link
        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        href="/login"
      >
        <UserIcon className="w-6" />
        <div className="hidden md:block">Iniciar sesión</div>
      </Link>
    </button>
  );
}
