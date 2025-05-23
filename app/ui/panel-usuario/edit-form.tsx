'use client';
import { useActionState } from 'react';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { User } from '@/app/lib/definitions/users.definitions';
import { updateUser } from '@/app/lib/actions/users.actions';

export default function Form({ user }: { user: User }) {
  const updateUserWithId = updateUser.bind(null, user.id);
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(updateUserWithId, initialState);

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
                placeholder="Escribe tu nuevo nombre de usuario"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
                defaultValue={user.name}
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
        {/* Correo electrónico */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Correo electrónico
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Escribe tu nuevo correo electrónico"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
                defaultValue={user.email}
              />
            </div>
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Contraseña actual */}
        <div className="mb-4">
          <label
            htmlFor="currentPassword"
            className="mb-2 block text-sm font-medium"
          >
            Contraseña actual
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="Escribe tu contraseña actual si vas a cambiarla por una nueva"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="currentPassword-error"
              />
            </div>
          </div>
          <div id="currentPassword-error" aria-live="polite" aria-atomic="true">
            {state.errors?.currentPassword &&
              state.errors.currentPassword.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Nueva contraseña */}
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="mb-2 block text-sm font-medium"
          >
            Nueva contraseña
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Escribe tu nueva contraseña"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="newPassword-error"
              />
            </div>
          </div>
          <div id="newPassword-error" aria-live="polite" aria-atomic="true">
            {state.errors?.newPassword &&
              state.errors.newPassword.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Confirmar nueva contraseña */}
        <div className="mb-4">
          <label
            htmlFor="confirmNewPassword"
            className="mb-2 block text-sm font-medium"
          >
            Confirmar nueva contraseña
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                placeholder="Escribe de nuevo tu nueva contraseña"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="confirmNewPassword-error"
              />
            </div>
          </div>
          <div
            id="confirmNewPassword-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.confirmNewPassword &&
              state.errors.confirmNewPassword.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      {state.message && (
        <div className="mt-1 text-sm text-red-500">{state.message}</div>
      )}

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/panel-usuario`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar información</Button>
      </div>
    </form>
  );
}
