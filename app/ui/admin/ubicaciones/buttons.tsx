import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteUbicacion } from '@/app/lib/actions/admin.ubicaciones.actions';

export function CreateUbicacion() {
  return (
    <Link
      href="/dashboard/admin/ubicaciones/create"
      className="mb-6 rounded-md border bg-blue-500 p-2 text-white hover:bg-blue-400"
    >
      Añadir ubicación
    </Link>
  );
}

export function UpdateUbicacion({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/admin/ubicaciones/${id}/edit`}>
      <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
        <span className="sr-only">Editar</span>
        <PencilSquareIcon className="h-5 w-5" />
      </button>
    </Link>
  );
}

export function DeleteUbicacion({ id }: { id: string }) {
  const deleteUbicacionWithId = deleteUbicacion.bind(null, id, false);
  return (
    <form action={deleteUbicacionWithId}>
      <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
        <span className="sr-only">Borrar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
