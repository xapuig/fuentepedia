import { fetchUbicacionById } from '@/app/lib/data/ubicaciones.data';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/admin/ubicaciones/edit-form';
import { Metadata } from 'next';
import { forbidden } from 'next/navigation';

import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
export const metadata: Metadata = {
  title: 'Editar ubicación',
};
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const AdminOrEditor = await checkifUserisAdminOrEditor();
  if (!AdminOrEditor) {
    forbidden();
  }
  const params = await props.params;
  const id = params.id;
  const ubicacion = await fetchUbicacionById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Gestión', href: '' },
          { label: 'Ubicaciones', href: '/dashboard/admin/ubicaciones' },
          {
            label: `${ubicacion[0].name}`,
            href: `/dashboard/admin/ubicaciones/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form ubicacion={ubicacion}></Form>
    </main>
  );
}
