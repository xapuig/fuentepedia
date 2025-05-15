'use client';

import { FuenteField } from '@/app/lib/definitions/fuentes.definitions';
import {
  CreateFuente,
  DeleteFuente,
  EditFuente,
} from '@/app/ui/admin/fuentes/buttons';
import Link from 'next/link';

export function FuentesInfo({ fuentes }: { fuentes: FuenteField[] }) {
  return (
    <div>
      <CreateFuente></CreateFuente>
      {fuentes.length > 0 ? (
        <div className="pt-3 grid grid-cols-1 gap-4 md:grid-cols-1 xl:grid-cols-3">
          {fuentes.map((fuente) => (
            <div
              key={fuente.id}
              className="border border-gray-400 hover:border-gray-900 focus:outline-none"
            >
              <div className="grid grid-cols-3 gap-4 border-b">
                <div className="col-span-2">
                  <p className="flex-1 text-gray-400">ID</p>
                  <p className="text-sm">{fuente.id}</p>
                </div>
                <div className="flex items-start justify-end gap-2">
                  <EditFuente
                    id_ubicacion={fuente.id_ubicacion}
                    id={fuente.id}
                  ></EditFuente>
                  <DeleteFuente
                    id_ubicacion={fuente.id_ubicacion}
                    id={fuente.id}
                  ></DeleteFuente>
                </div>
              </div>
              <div className="border-b border-gray-400">
                <p className="text-gray-400">ID ubicación:</p>
                <p className="text-sm">{fuente.id_ubicacion}</p>
              </div>
              <div className="border-b border-gray-400">
                <p className="text-gray-400">Nombre ubicación:</p>
                <p className="text-sm">{fuente.name_ubicacion}</p>
              </div>
              <div className="border-b border-gray-400">
                <p className="text-gray-400">Nombre</p>
                <p className="text-sm">{fuente.name}</p>
              </div>
              <div className="border-b border-gray-400">
                <p className="font-bold text-gray-400">Latitud:</p>
                <p>{fuente.lat}</p>
              </div>
              <div className="border-b border-gray-400">
                <p className="font-bold text-gray-400">Longitud:</p>
                <p>{fuente.lng}</p>
              </div>
              <div className="border-b border-gray-400">
                <p className="font-bold text-gray-400">URL Imagen:</p>
                <p>{fuente.imgUrl}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No hay fuentes</p>
        </div>
      )}
    </div>
  );
}
