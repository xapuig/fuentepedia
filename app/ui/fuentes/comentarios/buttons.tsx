'use client';
import { deleteComentario } from '@/app/lib/actions/comentarios.actions';
import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import { ComentarioField } from '@/app/lib/definitions/comentarios.definitions';

export function DeleteComentario({
  comentario,
  id_fuente,
}: {
  comentario: ComentarioField;
  id_fuente: string;
}) {
  const deleteComentariowithId = deleteComentario.bind(
    null,
    comentario.id,
    id_fuente,
    comentario.id_usuario,
    false,
  );
  return (
    <form action={deleteComentariowithId} className="inline-flex">
      <button
        type="submit"
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
