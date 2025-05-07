'use client';
import { FuenteField } from '@/app/lib/definitions/fuentes.definitions';
import { EditFuente, DeleteFuente } from '@/app/ui/ubicaciones/fuentes/buttons';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
type Props = {
  fuente: FuenteField | null;
  onClose: () => void;
  AdminOrEditor: boolean;
};

export function FuenteInfo({ fuente, onClose, AdminOrEditor }: Props) {
  if (!fuente) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded bg-white shadow-lg">
        {/* Encabezado*/}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-xl font-bold">{fuente.name}</h2>

          <div className="flex items-center space-x-2">
            {AdminOrEditor && (
              <div className='flex items-center space-x-2'>
                {' '}
                <EditFuente ubicacionId={fuente.ubicacion_id} id={fuente.id} />
                <DeleteFuente
                  ubicacionId={fuente.ubicacion_id}
                  id={fuente.id}
                  onClose={onClose}
                />
              </div>
            )}

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        {/* Imagen*/}
        <div>
          <div className="relative max-h-[30vh] overflow-y-auto border-b p-4">
            <Image
              src={fuente.imgUrl}
              alt={fuente.name}
              width={250}
              height={250}
              className="mx-auto rounded-md"
            ></Image>
          </div>
        </div>

        {/* Cuerpo */}
        <div className="flex-1 overflow-y-auto p-4">
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
          <p className="mb-4">Lorem ipsum dolor sit amet...</p>
        </div>
      </div>
    </div>
  );
}
