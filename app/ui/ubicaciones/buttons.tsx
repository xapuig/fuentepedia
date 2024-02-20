import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteUbicacion } from '@/app/lib/actions';

export function CreateUbicacion() {
  return (
    <Link
      href="/dashboard/ubicaciones/create"
      className="bg-blue-500 mb-4 text-white rounded-md border p-2 hover:bg-blue-400"
    >
      Añadir ubicación
    </Link>
  );
}

export function UpdateUbicacion({ id }: { id: string }) {
  return (
    <main className='mt-2'>
      <Link
        href={`/dashboard/ubicaciones/${id}/edit`}
        className=""
      >
        <button className="mt-4 rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Editar</span>
        <PencilIcon className="w-5" />
      </button>
      </Link>
    </main>
  );
}

export function DeleteUbicacion({ id }: { id: string }) {
  const deleteUbicacionWithId = deleteUbicacion.bind(null, id);
  return (
    <form action={deleteUbicacionWithId}>
      <button className="mt-4 rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Borrar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
