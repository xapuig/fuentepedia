import { Metadata } from 'next';
import Map from '@/app/ui/ubicaciones/mapa/print-map';
import {
  fetchUbicacionById,
  fetchFuentesByUbicacionId,
  fetchUbicaciones,
} from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { notFound } from 'next/navigation';
import { CreateFuente } from '@/app/ui/fuentes/buttons';
import Form from '@/app/ui/fuentes/select-form';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
import { auth } from '@/auth';
import Link from 'next/link';

const { validate, version } = require('uuid');

export const metadata: Metadata = {
  title: 'Mapa de fuentes',
};
export default async function Page(props: {
  params: Promise<{ id: string; lat?: number; lng?: number }>;
  searchParams: Promise<{ lat: number; lng: number }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const id = params.id;
  const lat = searchParams.lat;
  const lng = searchParams.lng;
  const AdminOrEditor = await checkifUserisAdminOrEditor();
  if (!validate(id)) {
    notFound();
  }

  const session = await auth();

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
          <div className="mt-4 flex items-center  gap-2 md:mt-8">
            <CreateFuente id_ubicacion={ubicacion[0].id} />
            <button className="mb-6 rounded-md border bg-blue-500 p-2 text-white hover:bg-blue-400">
              <Link href={`/dashboard/ubicaciones/${ubicacion[0].id}`}>
                Información de ubicación
              </Link>
            </button>
          </div>
          <div className="">
            <Map
              AdminOrEditor={true}
              ubicacion={ubicacion}
              fuentes={fuentes || []}
              id_user={session?.user?.id}
              lat={lat}
              lng={lng}
            />
          </div>
        </div>
      ) : (
        <Map
          AdminOrEditor={false}
          ubicacion={ubicacion}
          fuentes={fuentes || []}
          id_user={session?.user?.id}
          lat={lat}
          lng={lng}
        />
      )}
    </div>
  );
}
