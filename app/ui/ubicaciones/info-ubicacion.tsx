'use client';
import { UbicacionField } from '@/app/lib/definitions/ubicaciones.definitions';
import { useRouter } from 'next/navigation';
import { UpdateUbicacion } from '@/app/ui/ubicaciones/buttons';
import { DeleteUbicacion } from '@/app/ui/ubicaciones/buttons';

export default function Info({ ubicacion }: { ubicacion: UbicacionField[] }) {
  const router = useRouter();

  return (
    <main className="bg-gray-200 p-4  text-center">
      <div className="mx-auto max-w-md rounded bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Información de la Ciudad</h1>

        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Nombre:
          </label>
          <p className="leading-5 text-gray-900" id="nombre">
            {ubicacion[0].name}
          </p>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Código Postal:
          </label>
          <p className="leading-5 text-gray-900" id="codigoPostal">
            {ubicacion[0].zipcode}
          </p>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Latitud:
          </label>
          <p className="leading-5 text-gray-900" id="latitud">
            {ubicacion[0].lat}
          </p>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Longitud:
          </label>
          <p className="leading-5 text-gray-900" id="longitud">
            {ubicacion[0].lng}
          </p>
        </div>
        <UpdateUbicacion id={ubicacion[0].id}></UpdateUbicacion>
        <DeleteUbicacion id={ubicacion[0].id}></DeleteUbicacion>
      </div>
    </main>
  );
}
