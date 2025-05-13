import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/ubicaciones/create-form';
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
          { label: 'Ubicaciones', href: '/dashboard/ubicaciones' },
          {
            label: `Crear ubicación`,
            href: `/dashboard/ubicaciones/create`,
            active: true,
          },
        ]}
      />
      <Form></Form>
    </main>
  );
}
