import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchFuentesByUbicacionId, fetchUbicacionById } from '@/app/lib/data';
import { Metadata } from 'next';
import MapCreateMarker from '@/app/ui/fuentes/print-map-createmarker';

export const metadata: Metadata = {
  title: 'Crear marcador de fuente',
};
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [ubicacion, fuentes] = await Promise.all([
      fetchUbicacionById(id),
      fetchFuentesByUbicacionId(id),
    ]);
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Fuentes', href: '/dashboard/fuentes' },
          {
            label: `${ubicacion[0].name}`,
            href: `/dashboard/fuentes/${id}`,
          },
          {
            label: `Crear marcador`,
            href: `/dashboard/fuentes/${id}/create`,
            active: true,
          },
        ]}
      />
      <MapCreateMarker ubicacion={ubicacion} fuentes={fuentes} />
    </main>
  );
}