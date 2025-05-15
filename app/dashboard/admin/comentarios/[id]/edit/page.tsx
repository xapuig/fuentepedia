import { fetchComentarioById } from '@/app/lib/data/comentarios.data';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/admin/comentarios/edit-form';
import { Metadata } from 'next';
import { forbidden } from 'next/navigation';

import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
export const metadata: Metadata = {
  title: 'Editar comentario',
};
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const AdminOrEditor = await checkifUserisAdminOrEditor();
  if (!AdminOrEditor) {
    forbidden();
  }
  const params = await props.params;
  const id = params.id;
  const comentario = await fetchComentarioById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Gestión', href: '' },
          { label: 'Comentarios', href: '/dashboard/admin/comentarios' },
          {
            label: `${comentario[0].id}`,
            href: `/dashboard/admin/ubicaciones/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form comentario={comentario}></Form>
    </main>
  );
}
