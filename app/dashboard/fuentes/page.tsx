import Form from '@/app/ui/fuentes/select-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchUbicaciones } from '@/app/lib/data';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Seleccionar ubicación',
};
 
export default async function Page() {
  const ubicaciones = await fetchUbicaciones();
 
  return (
    <main>
      <Form ubicaciones={ubicaciones} />
    </main>
  );
}