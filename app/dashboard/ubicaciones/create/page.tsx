import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/ubicaciones/create-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear ubicación',
};
 
export default async function Page() {
    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Ubicaciones', href: '/dashboard/ubicaciones' },
            {
              label: `Crear ubicación`,
              href: `/dashboard/ubicaciones/create`,
              active: true,
            },
          ]}
        />
        <Form></Form>
      </main>
    );
  }