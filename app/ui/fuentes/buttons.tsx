'use client';
import { deleteFuente } from '@/app/lib/actions/fuentes.actions';
import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';

export function CreateFuente({ id_ubicacion }: { id_ubicacion: string }) {
  return (
    <Link
      href={{
        pathname: `/dashboard/fuentes/create`,
        query: { id_ubicacion },
      }}
      className="mb-6 rounded-md border bg-blue-500 p-2 text-white hover:bg-blue-400"
    >
      <span className="hidden md:block">Añadir fuente</span>
    </Link>
  );
}

export function CreateFuenteInfoWindow({
  id,
  lat,
  lng,
}: {
  id: string;
  lat: number;
  lng: number;
}) {
  return (
    <Link
      href={{
        pathname: `/dashboard/fuentes/create`,
        query: { id_ubicacion: id, lat: lat, lng: lng },
      }}
      className="text-blue-600 hover:text-blue-300"
    >
      Añadir fuente
    </Link>
  );
}

export function EditFuente({ id }: { id_ubicacion: string; id: string }) {
  return (
    <Link
      href={`/dashboard/fuentes/${id}/edit`}
      className="text-gray-500 hover:text-gray-700 focus:outline-none"
    >
      <PencilSquareIcon className="h-5 w-5" />
    </Link>
  );
}

export function DeleteFuente({
  id_ubicacion,
  id,
}: {
  id_ubicacion: string;
  id: string;
}) {
  const deleteFuentewithId = deleteFuente.bind(null, id_ubicacion, id, false);
  return (
    <form action={deleteFuentewithId} className="inline-flex">
      <button
        type="submit"
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
