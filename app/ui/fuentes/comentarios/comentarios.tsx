'use client';
import { useEffect, useState } from 'react';
import { ComentarioField } from '@/app/lib/definitions/comentarios.definitions';
import { FuenteField } from '@/app/lib/definitions/fuentes.definitions';
import { DeleteComentario } from '@/app/ui/fuentes/comentarios/buttons';

export function ComentariosFuente({
  fuente,
  comentarios,
  AdminOrEditor,
  id_user,
}: {
  fuente: FuenteField;
  comentarios: ComentarioField[];
  AdminOrEditor: boolean;
  id_user: string | undefined;
}) {
  return (
    <div className="mt-4">
      {comentarios.length > 0 &&
        comentarios.map((comentario, key) => (
          <div
            key={key}
            className="mb-4 rounded border border-gray-900 bg-gray-50 p-2 hover:bg-gray-100 "
          >
            <div className="grid grid-cols-3 ">
              <div className="col-span-2 font-bold">
                <p>{comentario.nombre_usuario}</p>
              </div>
              <div className="flex items-start justify-end gap-2">
                {(AdminOrEditor || id_user === comentario.id_usuario) && (
                  <DeleteComentario
                    comentario={comentario}
                    id_fuente={fuente.id}
                  ></DeleteComentario>
                )}
              </div>
            </div>
            <div className="overflow-show flex  text-gray-800">
              {comentario.texto}
            </div>
          </div>
        ))}
    </div>
  );
}
