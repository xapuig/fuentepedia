import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
import { fetchUbicaciones } from '@/app/lib/data/ubicaciones.data';
import { forbidden } from 'next/navigation';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { UbicacionesInfo } from '@/app/ui/admin/ubicaciones/ubicaciones-info';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lista de ubicaciones',
};

export default async function Page() {
  const AdminOrEditor = await checkifUserisAdminOrEditor();
  if (!AdminOrEditor) {
    forbidden();
  }
  const ubicaciones = await fetchUbicaciones();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Gestión',
            href: '',
          },
          {
            label: 'Ubicaciones',
            href: '/dashboard/admin/ubicaciones',
            active: true,
          },
        ]}
      />
      <UbicacionesInfo ubicaciones={ubicaciones} />
    </main>
  );
}
