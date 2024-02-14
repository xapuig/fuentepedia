import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchFuentesByUbicacionId, fetchUbicacionById, fetchFuenteById } from '@/app/lib/data';
import { Metadata } from 'next';
import MapEditMarker from '@/app/ui/fuentes/print-map-editmarker';

export const metadata: Metadata = {
  title: 'Editar marcador de fuente',
};
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const fuente_a_editar = await fetchFuenteById(id);
    const [ ubicacion, fuentes] = await Promise.all([
      fetchUbicacionById(fuente_a_editar[0].ubicacion_id),
      fetchFuentesByUbicacionId(fuente_a_editar[0].ubicacion_id)
    ]);
     
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Fuentes', href: '/dashboard/fuentes' },
          {
            label: `${ubicacion[0].name}`,
            href: `/dashboard/fuentes/${ubicacion[0].id}`,
          },
          {
            label: `Editar marcador`,
            href: `/dashboard/fuentes/${id}/edit`,
            active: true,
          },
        ]}
      />
      <MapEditMarker ubicacion={ubicacion} fuentes={fuentes} fuente_a_editar={fuente_a_editar} />
    </main>
  );
}