import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/admin/ubicaciones/create-form';
import { Metadata } from 'next';
import { forbidden } from 'next/navigation';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
export const metadata: Metadata = {
  title: 'Crear ubicación',
};

export default async function Page() {
  const AdminOrEdtior = await checkifUserisAdminOrEditor();

  if (!AdminOrEdtior) {
    forbidden();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Gestión', href: '/dashboard/admin/ubicaciones' },
          {
            label: `Crear ubicación`,
            href: `/dashboard/admin/ubicaciones/create`,
            active: true,
          },
        ]}
      />
      <Form></Form>
    </main>
  );
}
