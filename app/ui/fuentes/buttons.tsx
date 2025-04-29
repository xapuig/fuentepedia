'use client';
import { deleteFuente } from '@/app/lib/actions';
import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
export function CreateFuente({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/fuentes/${id}/create`}
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
        pathname: `/dashboard/fuentes/${id}/create`,
        query: { lat: lat, lng: lng },
      }}
      className="text-blue-600 hover:text-blue-300"
    >
      Añadir fuente
    </Link>
  );
}

export function EditFuente({ id }: { id: string }) {
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
  id,
  onClose,
}: {
  id: string;
  onClose?: () => void;
}) {
  const deleteFuentewithId = deleteFuente.bind(null, id);
  const handleSubmit = () => {
    if (onClose) onClose();
    deleteFuentewithId();
  };
  return (
    <form action={handleSubmit} className="inline-flex">
      <button
        type="submit"
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
