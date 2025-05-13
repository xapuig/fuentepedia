import { Metadata } from 'next';
import Info from '@/app/ui/ubicaciones/info-ubicacion';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import {
  fetchFuenteById,
  fetchUbicacionById,
  fetchComentariosByFuente,
} from '@/app/lib/data';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
const { validate, version } = require('uuid');
import { forbidden } from 'next/navigation';
import { FuenteInfo } from '@/app/ui/fuentes/fuente-info';
import { auth } from '@/auth';
export const metadata: Metadata = {
  title: 'Información de ubicacion',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const session = await auth();

  if (!validate(id)) {
    notFound();
  }

  const [fuente] = await Promise.all([fetchFuenteById(id)]);
  if (!fuente || fuente.length === 0) {
    notFound();
  }

  const AdminOrEditor = await checkifUserisAdminOrEditor();

  const comentarios = await fetchComentariosByFuente(id);



  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <FuenteInfo
          fuente={fuente[0]}
          AdminOrEditor={AdminOrEditor}
          id_user={session?.user?.id}
          comentarios_fuente={comentarios}
        ></FuenteInfo>
      </div>
    </div>
  );
}
