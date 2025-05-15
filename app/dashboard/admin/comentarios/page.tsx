import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
import { fetchComentarios_returnNombreFuenteNombreUsuario } from '@/app/lib/data/comentarios.data';
import { forbidden } from 'next/navigation';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { ComentariosInfo } from '@/app/ui/admin/comentarios/comentarios-info';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lista de comentarios',
};

export default async function Page() {
  const AdminOrEditor = await checkifUserisAdminOrEditor();
  if (!AdminOrEditor) {
    forbidden();
  }
  const comentarios = await fetchComentarios_returnNombreFuenteNombreUsuario();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Gestión',
            href: '',
          },
          {
            label: 'Comentarios',
            href: '/dashboard/admin/comentarios',
            active: true,
          },
        ]}
      />
      <ComentariosInfo comentarios={comentarios} />
    </main>
  );
}
