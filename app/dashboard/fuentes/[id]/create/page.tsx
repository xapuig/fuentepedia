import Form from '@/app/ui/fuentes/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchUbicacionById } from '@/app/lib/data';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Crear marcador de fuente',
};
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const ubicacion = await fetchUbicacionById(id);
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Fuentes', href: '/dashboard/fuentes' },
          {
            label: `Fuentes de ${ubicacion[0].name}`,
            href: `/dashboard/fuentes/${id}`,
          },
          {
            label: `Crear marcador de fuente`,
            href: `/dashboard/fuentes/${id}/create`,
            active: true,
          },
        ]}
      />
      <Form ubicaciones={ubicacion} />
    </main>
  );
}