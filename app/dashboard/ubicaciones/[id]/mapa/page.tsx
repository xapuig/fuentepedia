import { Metadata } from 'next';
import Map from '@/app/ui/ubicaciones/mapa/print-map';
import {
  fetchUbicacionById,
  fetchFuentesByUbicacionId,
  fetchUbicaciones,
} from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { CreateFuente } from '@/app/ui/ubicaciones/fuentes/buttons';
import Form from '@/app/ui/ubicaciones/fuentes/select-form';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
const { validate, version } = require('uuid');

export const metadata: Metadata = {
  title: 'Mapa de fuentes',
};
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const AdminOrEditor = await checkifUserisAdminOrEditor();
  if (!validate(id)) {
    notFound();
  }

  const [ubicacion, fuentes, ubicaciones] = await Promise.all([
    fetchUbicacionById(id),
    fetchFuentesByUbicacionId(id),
    fetchUbicaciones(),
  ]);

  if (!ubicacion || ubicacion.length === 0) {
    notFound();
  }

  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Ubicaciones', href: '/dashboard/ubicaciones' },
          {
            label: `${ubicacion[0].name}`,
            href: ``,
          },
          {
            label: 'Mapa de fuentes',
            href: `/dashboard/ubicaciones/${id}/mapa`,
            active: true,
          },
        ]}
      />
      <Form ubicaciones={ubicaciones} />
      {AdminOrEditor ? (
        <div className="mt-4">
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <CreateFuente id={id} />
          </div>
          <div className=''>
            <Map
              AdminOrEditor={true}
              ubicacion={ubicacion}
              fuentes={fuentes || []}
            />
          </div>
        </div>
      ) : (
        <Map
          AdminOrEditor={false}
          ubicacion={ubicacion}
          fuentes={fuentes || []}
        />
      )}
    </div>
  );
}
