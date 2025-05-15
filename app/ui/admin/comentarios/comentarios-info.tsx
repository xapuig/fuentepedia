'use client';

import { ComentarioField } from '@/app/lib/definitions/comentarios.definitions';
import {
  DeleteComentario,
  UpdateComentario,
} from '@/app/ui/admin/comentarios/buttons';

export function ComentariosInfo({
  comentarios,
}: {
  comentarios: ComentarioField[];
}) {
  return (
    <div>
      {comentarios.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 xl:grid-cols-3">
          {comentarios.map((comentario) => (
            <div
              className="border border-gray-400 hover:border-gray-900 focus:outline-none"
              key={comentario.id}
            >
              <div className="grid grid-cols-3 gap-4 border-b">
                <div className="col-span-2">
                  <p className="flex-1 text-gray-400">ID</p>
                  <p className="text-sm">{comentario.id}</p>
                </div>
                <div className="flex items-start justify-end gap-2">
                  <UpdateComentario id={comentario.id}></UpdateComentario>
                  <DeleteComentario id={comentario.id}></DeleteComentario>
                </div>
              </div>
              <div className="border-b border-gray-400">
                <p className="text-gray-400">ID Fuente:</p>
                <p className="text-sm">{comentario.id_fuente}</p>
              </div>
              <div className="border-b border-gray-400">
                <p className="font-bold text-gray-400">Nombre fuente:</p>
                <p>{comentario.nombre_fuente}</p>
              </div>
              <div className="border-b border-gray-400">
                <p className="font-bold text-gray-400">ID Usuario:</p>
                <p>{comentario.id_usuario}</p>
              </div>
              <div className="border-b border-gray-400">
                <p className="font-bold text-gray-400">Nombre usuario:</p>
                <p>{comentario.nombre_usuario}</p>
              </div>
              <div className="">
                <p className="font-bold text-gray-400">Texto:</p>
                <p>{comentario.texto}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No hay comentarios</p>
        </div>
      )}
    </div>
  );
}
