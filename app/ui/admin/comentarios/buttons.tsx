import { deleteComentario } from '@/app/lib/actions/admin.comentarios.actions';
import { TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export function UpdateComentario({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/admin/comentarios/${id}/edit`}>
      <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
        <span className="sr-only">Editar</span>
        <PencilSquareIcon className="h-5 w-5" />
      </button>
    </Link>
  );
}
export function DeleteComentario({ id }: { id: string }) {
  const deleteUsuarioWithId = deleteComentario.bind(null, id, false);
  return (
    <form action={deleteUsuarioWithId}>
      <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
        <span className="sr-only">Borrar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
