import { Metadata } from 'next';
import Info from '@/app/ui/ubicaciones/info-ubicacion';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchUbicacionById } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Información de ubicacion',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [ubicacion] = await Promise.all([fetchUbicacionById(id)]);
  if (!ubicacion)  {
    notFound();
  }

  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Ubicaciones', href: '/dashboard/ubicaciones' },
          {
            label: `${ubicacion[0].name}`,
            href: `/dashboard/ubicaciones/${id}`,
            active: true,
          },
        ]}
      />

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Info ubicacion={ubicacion} />
      </div>
    </div>
  );
}
