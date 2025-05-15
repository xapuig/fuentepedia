import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchFuentesByUbicacionId } from '@/app/lib/data/fuentes.data';
import { Metadata } from 'next';
import MapCreateMarker from '@/app/ui/admin/fuentes/create-form';
import { forbidden } from 'next/navigation';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
import {
  fetchUbicaciones,
  fetchUbicacionById,
} from '@/app/lib/data/ubicaciones.data';
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
              { label: 'Gestión', href: '/dashboard/admin/fuentes' },
              {
                label: `Crear fuente`,
                href: `/dashboard/admin/fuentes`,
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
