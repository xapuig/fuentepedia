import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
export function UpdateUser() {
  return (
    <Link href={`/dashboard/panel-usuario/edit`} className="">
      <button className="rounded-md border hover:bg-gray-100">
        <span className="sr-only">Editar información de usuario</span>
        <PencilIcon className="w-5" />
      </button>
    </Link>
  );
}
