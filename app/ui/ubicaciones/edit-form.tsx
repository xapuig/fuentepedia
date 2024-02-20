'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateUbicacion} from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { UbicacionField } from '@/app/lib/definitions';

export default function Form( { ubicacion }: { ubicacion: UbicacionField[] } ) {
    const updateUbicacionWithId = updateUbicacion.bind(null, ubicacion[0].id);
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(updateUbicacionWithId, initialState);
    return (
    
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
            {/* Nombre */}
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
                    placeholder="Escribe el nombre de la ubicación"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="name-error"
                    defaultValue={ubicacion[0].name}
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
                {/* Código postal */}
                <div className="mb-4">
                <label htmlFor="zipcode" className="mb-2 block text-sm font-medium">
                Código postal
                </label>
                <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                    id="zipcode"
                    name="zipcode"
                    type="text"
                    placeholder="Escribe el código postal de la ubicación"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="zipcode-error"
                    defaultValue={ubicacion[0].zipcode}
                    />
                </div>
                </div>
                <div id="zipcode-error" aria-live="polite" aria-atomic="true">
                {state.errors?.zipcode &&
                state.errors.zipcode.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                </p>
                ))}
                </div>
            </div>
            {/* Latitud */}
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
                    placeholder="Escribe la latitud de la ubicación"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="lat-error"
                    defaultValue={ubicacion[0].lat}
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
            {/* Longitud */}
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
                    placeholder="Escribe la longitud de la ubicación"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="lng-error"
                    defaultValue={ubicacion[0].lng}
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
                href={`/dashboard/ubicaciones/${ubicacion[0].id}`}
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
                Cancelar
            </Link>
            <Button type="submit">Editar ubicación</Button>
        </div>
    </form>
  );
}
