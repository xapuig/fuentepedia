'use client';
import { UbicacionField } from '@/app/lib/definitions';


import { useRouter } from 'next/navigation'

export default function Form({ ubicaciones}: { ubicaciones: UbicacionField[] }) {
    
  const router = useRouter()
  
    return (
      <div>
                  
        <select
            onChange={() => router.push(`/dashboard/ubicaciones/${(document.getElementById('ubicacion') as HTMLInputElement).value}`)}
            id="ubicacion"
            name="ubicacionId"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
            aria-describedby="ubicacion-error"
        >
            <option value="" disabled>
                Selecciona una ubicación
            </option>
            {ubicaciones.map((ubicacion) => (
                <option key={ubicacion.id} value={ubicacion.id}>
                  {ubicacion.name}
                </option>
            ))}
        </select>
        
 
      </div>
    );
  }