import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import {
  fetchFuentesByUbicacionId,
  fetchUbicacionById,
  fetchFuenteById,
  fetchComentariosByFuente,
} from '@/app/lib/data';
import { Metadata } from 'next';
import MapEditMarker from '@/app/ui/fuentes/print-map-editmarker';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
import { forbidden } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Editar marcador de fuente',
};

export default async function Page(props: {
  params: Promise<{ id: string; 'id-fuente': string }>;
}) {
  const params = await props.params;
  const AdminOrEditor = await checkifUserisAdminOrEditor();
  if (!AdminOrEditor) {
    forbidden();
  }

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
          { label: 'Ubicaciones', href: '/dashboard/ubicaciones' },
          {
            label: `${ubicacion[0].name}`,
            href: `/dashboard/ubicaciones/${ubicacion[0].id}/mapa`,
          },
          {
            label: `Editar información de fuente`,
            href: ``,
            active: true,
          },
        ]}
      />
      <MapEditMarker
        ubicacion={ubicacion}
        fuentes={fuentes}
        fuente_a_editar={fuente_a_editar}
      />
    </main>
  );
}
