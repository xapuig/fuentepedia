import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchFuentesByUbicacionId, fetchUbicacionById } from '@/app/lib/data';
import { Metadata } from 'next';
import MapCreateMarker from '@/app/ui/ubicaciones/fuentes/print-map-createmarker';
import { forbidden } from 'next/navigation';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils'
export const metadata: Metadata = {
  title: 'Crear marcador de fuente',
};

export default async function Page(
  props: {
    params: Promise<{ id: string; lat: number; lng: number }>;
    searchParams: Promise<{ lat: number; lng: number }>;
  }
) {
  const AdminOrEdtior = await checkifUserisAdminOrEditor();

  if (!AdminOrEdtior) {
    forbidden();
  }
  const searchParams = await props.searchParams;
  const params = await props.params;
  const id = params.id;

  const [ubicacion, fuentes] = await Promise.all([
    fetchUbicacionById(id),
    fetchFuentesByUbicacionId(id),
  ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Ubicaciones', href: '/dashboard/ubicaciones' },
          {
            label: `${ubicacion[0].name}`,
            href: `/dashboard/ubicaciones/${id}/mapa`,
          },
          {
            label: `Añadir fuente`,
            href: ``,
            active: true,
          },
        ]}
      />
      <MapCreateMarker
        ubicacion={ubicacion}
        fuentes={fuentes}
        latnuevo={searchParams.lat}
        lngnuevo={searchParams.lng}
      />
    </main>
  );
}
