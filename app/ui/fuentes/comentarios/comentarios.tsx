'use client';
import { useEffect, useState } from 'react';
import { ComentarioField } from '@/app/lib/definitions/comentarios.definitions';
import { FuenteField } from '@/app/lib/definitions/fuentes.definitions';

export function ComentariosFuente({
  fuente,
  comentarios,
}: {
  fuente: FuenteField;
  comentarios: ComentarioField[];
}) {
  return (
    <div className="mt-4">
      {comentarios.length > 0 &&
        comentarios.map((comentario, key) => (
          <div
            key={key}
            className="mb-4 rounded-md border border-gray-900 bg-gray-50 p-2"
          >
            <div className="font-bold">
              <p>{comentario.nombre_usuario}</p>
            </div>
            <div className="overflow-show flex  text-gray-800">
              {comentario.texto}
            </div>
          </div>
        ))}
    </div>
  );
}
