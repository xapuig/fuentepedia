import Breadcrumbs from '@/app/ui/breadcrumbs';
import { getUserById, getUserAdmin } from '@/app/lib/data/users.data';
import { Metadata } from 'next';
import { forbidden } from 'next/navigation';
import Form from '@/app/ui/admin/users/edit-form';
export const metadata: Metadata = {
  title: 'Editar usuario',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const admin = await getUserAdmin();
  if (!admin) {
    forbidden();
  }

  const id_user = params['id'];
  const user = await getUserById(id_user);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Gestión', href: '' },
          { label: 'Usuarios', href: '/dashboard/admin/users' },
          {
            label: `${user.name}`,
            href: `/dashboard/admin/users/${user.id}/edit`,
            active: true,
          },
        ]}
      />
      <Form user={user}></Form>
    </main>
  );
}
