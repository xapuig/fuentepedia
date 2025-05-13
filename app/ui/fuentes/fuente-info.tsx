'use client';
import { FuenteField } from '@/app/lib/definitions/fuentes.definitions';
import { ComentarioField } from '@/app/lib/definitions/comentarios.definitions';
import { EditFuente, DeleteFuente } from '@/app/ui/fuentes/buttons';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { ComentariosFuente } from '@/app/ui/fuentes/comentarios/comentarios';
import { FormComentarioFuente } from '@/app/ui/fuentes/comentarios/comentarios-form';
import Link from 'next/link';
type Props = {
  fuente: FuenteField;
  AdminOrEditor: boolean;
  id_user: string | undefined;
  comentarios_fuente: ComentarioField[];
};

export function FuenteInfo({
  fuente,
  AdminOrEditor,
  id_user,
  comentarios_fuente,
}: Props) {
  if (!fuente) {
    return null;
  }

  return (
    <div className=" flex w-full items-center justify-center">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded bg-white shadow-lg">
        {/* Encabezado*/}
        <div className="flex items-center justify-between border-b px-4 py-3 pl-20">
          <div className="flex-1 text-center">
            <h2 className="text-xl font-bold">{fuente.name}</h2>
          </div>

          <div className="flex items-center space-x-2">
            {AdminOrEditor && (
              <div className="flex items-center space-x-2">
                <EditFuente id_ubicacion={fuente.id_ubicacion} id={fuente.id} />
                <DeleteFuente
                  id_ubicacion={fuente.id_ubicacion}
                  id={fuente.id}
                />
              </div>
            )}
            <Link
              className="flex items-center justify-center text-gray-500 hover:text-gray-700"
              href={{
                pathname: `/dashboard/ubicaciones/${fuente.id_ubicacion}/mapa`,
                query: { lat: fuente.lat, lng: fuente.lng },
              }}
            >
              <XCircleIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
        {/* Imagen*/}
        <div>
          <div className="relative max-h-[30vh] overflow-y-auto border-b p-4">
            <Image
              src={fuente.imgUrl}
              alt={fuente.name}
              width={250}
              height={250}
              className="mx-auto rounded-md"
            ></Image>
          </div>
        </div>

        {/* Cuerpo */}
        <div
          id="comentarios"
          className="flex-[1] overflow-y-auto bg-gray-50 p-2 sm:p-2"
        >
          {comentarios_fuente.length > 0 ? (
            <div className="w-full">
              <ComentariosFuente
                fuente={fuente}
                comentarios={comentarios_fuente}
              ></ComentariosFuente>
            </div>
          ) : (
            <h2 className="w-full text-center text-xl font-bold">
              No hay comentarios
            </h2>
          )}
        </div>
        <div className="border-t bg-gray-50 p-4 sm:p-6">
          {id_user ? (
            <FormComentarioFuente fuente={fuente} id_user={id_user} />
          ) : (
            <h2 className="text-center text-xl font-bold">
              Inicia sesión para poder escribir comentarios
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}
