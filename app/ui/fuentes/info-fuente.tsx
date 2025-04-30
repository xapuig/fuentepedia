'use client';
import { FuenteField } from '@/app/lib/definitions';
import { EditFuente, DeleteFuente } from '@/app/ui/fuentes/buttons';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
type Props = {
  fuente: FuenteField | null;
  onClose: () => void;
};

export function InfoFuente({ fuente, onClose }: Props) {
  if (!fuente) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded bg-white shadow-lg">
        {/* Encabezado*/}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-xl font-bold">{fuente.name}</h2>
          <div className="flex items-center space-x-2">
            <EditFuente id={fuente.id} />
            <DeleteFuente id={fuente.id} onClose={onClose} />
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        {/* Imagen*/}
        <div className="flex border-b justify-center p-4 overflow-hidden ">
          <Image
            src={fuente.imgUrl}
            alt={fuente.name}
            width={600}
            height={800}
            className='rounded-md mx-auto'
            
          ></Image>
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
