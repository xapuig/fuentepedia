'use client';
import { UbicacionField } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation'
import { UpdateUbicacion } from '@/app/ui/ubicaciones/buttons';
import { DeleteUbicacion } from '@/app/ui/ubicaciones/buttons';

export default function Info({ ubicacion}: { ubicacion: UbicacionField[] }) {
    
  const router = useRouter()
  
    return (
        <main className="bg-gray-200 p-4  text-center">
            <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Información de la Ciudad</h1>

            <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
            <p className="text-gray-900 leading-5" id="nombre">{ubicacion[0].name}</p>
            </div>

            <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Código Postal:</label>
            <p className="text-gray-900 leading-5" id="codigoPostal">{ubicacion[0].zipcode}</p>
            </div>

            <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Latitud:</label>
            <p className="text-gray-900 leading-5" id="latitud">{ubicacion[0].lat}</p>
            </div>

            <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Longitud:</label>
            <p className="text-gray-900 leading-5" id="longitud">{ubicacion[0].lng}</p>
            </div>
            <UpdateUbicacion id={ubicacion[0].id}></UpdateUbicacion>
            <DeleteUbicacion id={ubicacion[0].id}></DeleteUbicacion>
        </div>
        </main>
    );
  }
