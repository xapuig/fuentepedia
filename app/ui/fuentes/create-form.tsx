'use client';

import { UbicacionField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createFuente } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ ubicaciones }: { ubicaciones: UbicacionField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createFuente, initialState);
  return (
    
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <input type ="hidden" name="ubicacionId" id="ubicacionId" value={ubicaciones[0].id} />
        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nombre
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Escribe el nombre de la fuente"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
            </div>
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
            state.errors.name.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
            </p>
            ))}
          </div>
        </div>
        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="lat" className="mb-2 block text-sm font-medium">
            Latitud
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lat"
                name="lat"
                type="number"
                step="any"
                required
                placeholder="Escribe la latitud para el marcador de la fuente"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="lat-error"
              />
            </div>
          </div>
          <div id="lat-error" aria-live="polite" aria-atomic="true">
            {state.errors?.lat &&
            state.errors.lat.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
            </p>
            ))}
          </div>
        </div>
        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="lng" className="mb-2 block text-sm font-medium">
            Longitud
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lng"
                name="lng"
                type="number"
                step="any"
                required
                placeholder="Escribe la longitud para el marcador de la fuente"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="lng-error"
              />
            </div>
          </div>
          <div id="lng-error" aria-live="polite" aria-atomic="true">
            {state.errors?.lng &&
            state.errors.lng.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
            </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={'/dashboard/fuentes/' + ubicaciones[0].id}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear fuente</Button>
      </div>
    </form>
  );
}
