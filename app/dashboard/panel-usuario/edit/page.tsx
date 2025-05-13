import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import { auth } from '@/auth';
import Form from '@/app/ui/panel-usuario/edit-form';
import { User } from '@/app/lib/definitions/users.definitions';
import { getUserById } from '@/app/lib/data';
import { forbidden } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Editar usuario',
};

export default async function Page() {
  const session = await auth();
  const usuario: User = await getUserById(session?.user?.id ?? '');
  if (session?.user?.id != usuario.id) {
    forbidden();
  } 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Editar información de usuario',
            href: '/dashboard/panel-usuario/edit',
            active: true,
          },
        ]}
      />
      <Form user={usuario}></Form>
    </main>
  );
}
