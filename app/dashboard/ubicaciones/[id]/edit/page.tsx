import { fetchUbicacionById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/ubicaciones/edit-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar ubicación',
};
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const ubicacion = await fetchUbicacionById(id);
    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Ubicaciones', href: '/dashboard/ubicaciones' },
            {
              label: `Editar ubicación ${ubicacion[0].name}`,
              href: `/dashboard/ubicaciones/${id}/edit`,
              active: true,
            },
          ]}
        />
        <Form ubicacion={ubicacion}></Form>
      </main>
    );
  }