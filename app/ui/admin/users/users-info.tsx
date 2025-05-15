'use client';

import { User } from '@/app/lib/definitions/users.definitions';
import {
  CreateUsuario,
  DeleteUsuario,
  UpdateUsuario,
} from '@/app/ui/admin/users/buttons';

export function UsersInfo({ users }: { users: User[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 xl:grid-cols-3">
      {users.map((user) => (
        <div
          className="focus:outline-none0 border border-gray-400 hover:border-gray-900"
          key={user.id}
        >
          <div className="grid grid-cols-3 gap-4 border-b">
            <div className="col-span-2">
              <p className="flex-1 text-gray-400">ID</p>
              <p className="text-sm">{user.id}</p>
            </div>
            <div className="flex items-start justify-end gap-2">
              <UpdateUsuario id={user.id}></UpdateUsuario>
              <DeleteUsuario id={user.id}></DeleteUsuario>
            </div>
          </div>
          <div className="border-b border-gray-400">
            <p className="text-gray-400">Correo:</p>
            <p className="text-sm">{user.email}</p>
          </div>
          <div className="border-b border-gray-400">
            <p className="font-bold text-gray-400">Usuario:</p>
            <p>{user.name}</p>
          </div>
          <div className="border-b border-gray-400">
            <p className="font-bold text-gray-400">Rol:</p>
            <p>{user.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
