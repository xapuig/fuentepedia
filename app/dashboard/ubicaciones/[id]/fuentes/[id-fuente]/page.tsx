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
const { validate, version } = require('uuid');

export const metadata: Metadata = {
  title: 'Mapa de fuentes',
};
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

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
          { label: 'Fuentes', href: '/dashboard/fuentes' },
          {
            label: `${ubicacion[0].name}`,
            href: `/dashboard/fuentes/${id}`,
            active: true,
          },
        ]}
      />
      <Form ubicaciones={ubicaciones} />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateFuente id={id} />
      </div>
      <Map ubicacion={ubicacion} fuentes={fuentes || []} />
    </div>
  );
}
