import { auth } from '@/auth';
import { UpdateUser } from './buttons';
import { getUserById } from '@/app/lib/data';
import { User } from '@/app/lib/definitions/users.definitions';
export async function UserInfo() {
  const session = await auth();
  const user: User = await getUserById(session?.user?.id ?? '');
  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <div className="mb-2 flex">
        <h2 className="text-xl font-bold text-gray-800">
          Información de usuario
        </h2>
        <UpdateUser />
      </div>

      <div className="space-y-4">
        {/* Nombre */}
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-500">Nombre</span>
          <span className="text-sm text-gray-900">
            {user.name || 'No disponible'}
          </span>
        </div>
        {/* Email */}
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-500">
            Correo electrónico
          </span>
          <span className="max-w-xs truncate text-sm text-gray-900">
            {user.email}
          </span>
        </div>
      </div>
    </div>
  );
}
