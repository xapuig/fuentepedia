import Form from '@/app/ui/ubicaciones/select-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchUbicaciones } from '@/app/lib/data';
import { Metadata } from 'next';
import { CreateUbicacion } from '@/app/ui/ubicaciones/buttons';

export const metadata: Metadata = {
  title: 'Seleccionar ubicación',
};

export default async function Page() {
  const ubicaciones = await fetchUbicaciones();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Ubicaciones',
            href: '/dashboard/ubicaciones',
            active: true,
          },
        ]}
      />
      <div className="flex items-center justify-between gap-2 md:mt-8">
        <CreateUbicacion />
      </div>
      <Form ubicaciones={ubicaciones} />
    </main>
  );
}
