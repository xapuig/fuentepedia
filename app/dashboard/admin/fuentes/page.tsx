import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
import { fetchFuentes, fetchFuentes_return_NombreUbicacion } from '@/app/lib/data/fuentes.data';
import { forbidden } from 'next/navigation';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { FuentesInfo } from '@/app/ui/admin/fuentes/fuentes-info';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lista de fuentes',
};
export default async function Page() {
  const AdminOrEditor = await checkifUserisAdminOrEditor();
  if (!AdminOrEditor) {
    forbidden();
  }
  const fuentes = await fetchFuentes_return_NombreUbicacion();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Gestión',
            href: '',
          },
          {
            label: 'Fuentes',
            href: '/dashboard/admin/ubicaciones',
            active: true,
          },
        ]}
      />
      <FuentesInfo fuentes={fuentes} />
    </main>
  );
}
