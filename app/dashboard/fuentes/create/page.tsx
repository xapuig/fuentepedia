import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchFuentesByUbicacionId, fetchUbicacionById } from '@/app/lib/data';
import { Metadata } from 'next';
import MapCreateMarker from '@/app/ui/fuentes/print-map-createmarker';
import { forbidden } from 'next/navigation';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
import { fetchUbicaciones } from '@/app/lib/data';
export const metadata: Metadata = {
  title: 'Crear marcador de fuente',
};

export default async function Page(props: {
  searchParams: Promise<{ id_ubicacion: string; lat: number; lng: number }>;
}) {
  const AdminOrEdtior = await checkifUserisAdminOrEditor();

  if (!AdminOrEdtior) {
    forbidden();
  }

  const searchParams = await props.searchParams;
  const id_ubicacion = searchParams.id_ubicacion;
  const lat = searchParams.lat;
  const lng = searchParams.lng;
  const ubicaciones = await fetchUbicaciones();

  const [ubicacion, fuentes] = await Promise.all([
    fetchUbicacionById(id_ubicacion),
    fetchFuentesByUbicacionId(id_ubicacion),
  ]);

  return (
    <main>
      {ubicacion[0] ? (
        <main>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Ubicaciones', href: '/dashboard/ubicaciones' },
              {
                label: `${ubicacion[0].name}`,
                href: `/dashboard/ubicaciones/${id_ubicacion}/mapa`,
              },
              {
                label: 'Añadir fuente',
                href: '',
                active: true,
              },
            ]}
          />
          <MapCreateMarker
            ubicacion={ubicacion}
            ubicaciones={ubicaciones}
            fuentes={fuentes}
            latnuevo={lat}
            lngnuevo={lng}
          />
        </main>
      ) : (
        <main>
          <Breadcrumbs
            breadcrumbs={[
              {
                label: 'Añadiendo fuente',
                href: '/dashboard/fuentes/create',
                active: true,
              },
            ]}
          />
          <MapCreateMarker ubicaciones={ubicaciones} />
        </main>
      )}
    </main>
  );
}
