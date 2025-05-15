import Breadcrumbs from '@/app/ui/breadcrumbs';
import {
  fetchFuentesByUbicacionId,
  fetchFuenteById,
} from '@/app/lib/data/fuentes.data';
import {
  fetchUbicacionById,
  fetchUbicaciones,
} from '@/app/lib/data/ubicaciones.data';
import { Metadata } from 'next';
import MapEditMarker from '@/app/ui/admin/fuentes/edit-form';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
import { forbidden } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Editar fuente',
};

export default async function Page(props: {
  params: Promise<{ id: string; 'id-fuente': string }>;
}) {
  const params = await props.params;
  const AdminOrEditor = await checkifUserisAdminOrEditor();
  if (!AdminOrEditor) {
    forbidden();
  }
  const ubicaciones = await fetchUbicaciones();

  const id_fuente = params['id'];

  const fuente_a_editar = await fetchFuenteById(id_fuente);
  const [ubicacion, fuentes] = await Promise.all([
    fetchUbicacionById(fuente_a_editar[0].id_ubicacion),
    fetchFuentesByUbicacionId(fuente_a_editar[0].id_ubicacion),
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Gestión', href: '' },
          { label: 'Fuentes', href: '/dashboard/admin/fuentes' },
          {
            label: `${fuente_a_editar[0].name}`,
            href: `/dashboard/admin/fuentes/${fuente_a_editar[0].id}/edit`,
            active: true,
          },
        ]}
      />
      <MapEditMarker
        ubicacion={ubicacion}
        fuentes={fuentes}
        fuente_a_editar={fuente_a_editar}
        ubicaciones={ubicaciones}
      />
    </main>
  );
}
