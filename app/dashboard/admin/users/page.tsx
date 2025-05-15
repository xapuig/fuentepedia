import {
  getUsers,
  getUserAdmin,
  getUserExists,
} from '@/app/lib/data/users.data';
import { forbidden } from 'next/navigation';
import { UsersInfo } from '@/app/ui/admin/users/users-info';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Lista de usuarios',
};
export default async function Page() {
  const admin = await getUserAdmin();

  if (!admin) {
    forbidden();
  }

  const users = await getUsers();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Gestión',
            href: '',
          },
          {
            label: 'Usuarios',
            href: '/dashboard/admin/users',
            active: true,
          },
        ]}
      />
      <UsersInfo users={users} />
    </main>
  );
}
