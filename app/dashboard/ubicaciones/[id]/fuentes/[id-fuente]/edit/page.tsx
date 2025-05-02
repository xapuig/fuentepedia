import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchFuentesByUbicacionId, fetchUbicacionById, fetchFuenteById } from '@/app/lib/data';
import { Metadata } from 'next';
import MapEditMarker from '@/app/ui/ubicaciones/fuentes/print-map-editmarker';

export const metadata: Metadata = {
  title: 'Editar marcador de fuente',
};
 
export default async function Page({ params }: { params: { id: string, 'id-fuente': string } }) {
    const id = params.id;
    const id_fuente = params['id-fuente'];
    const fuente_a_editar = await fetchFuenteById(id_fuente);
    const [ ubicacion, fuentes] = await Promise.all([
      fetchUbicacionById(fuente_a_editar[0].ubicacion_id),
      fetchFuentesByUbicacionId(fuente_a_editar[0].ubicacion_id)
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
      <MapEditMarker ubicacion={ubicacion} fuentes={fuentes} fuente_a_editar={fuente_a_editar} />
    </main>
  );
}