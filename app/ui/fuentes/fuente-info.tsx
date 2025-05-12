'use client';
import { FuenteField } from '@/app/lib/definitions/fuentes.definitions';
import { ComentarioField } from '@/app/lib/definitions/comentarios.definitions';
import { EditFuente, DeleteFuente } from '@/app/ui/fuentes/buttons';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { ComentariosFuente } from '@/app/ui/fuentes/comentarios/comentarios';
import { FormComentarioFuente } from '@/app/ui/fuentes/comentarios/comentarios-form';
import { useState, useEffect } from 'react';
type Props = {
  fuente: FuenteField;
  onClose: () => void;
  AdminOrEditor: boolean;
  id_user: string | undefined;
};

export function FuenteInfo({ fuente, onClose, AdminOrEditor, id_user }: Props) {
  const [comentarios, setComentarios] = useState<ComentarioField[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComentarios() {
      try {
        const res = await fetch(`/api/comentarios?id_fuente=${fuente.id}`);
        if (!res.ok) {
          if (res.status === 404) {
            setLoading(false);
            setError('No se encontraron comentarios');
          } else {
            setLoading(false);
            throw new Error('No se pudieron cargar los comentarios');
          }
        }
        const data = await res.json();
        setComentarios(data);
        setLoading(false);
      } catch (error) {
        setError('No se pudieron cargar los comentarios');
        setLoading(false);
      }
    }

    if (fuente.id) fetchComentarios();
  }, [fuente.id]);

  const handleComentarioEscrito = async () => {
    try {
      setError('');
      setTimeout(async () => {
        const res = await fetch(`/api/comentarios?id_fuente=${fuente.id}`);
        const data = await res.json();
        setComentarios(data);
        setLoading(false);
      }, 500);
    } catch (error) {
      setError('No se pudieron cargar los comentarios');
      setLoading(false);
    }
  };

  if (!fuente) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex  justify-center bg-black bg-opacity-50">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded bg-white shadow-lg">
        {/* Encabezado*/}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-xl font-bold">{fuente.name}</h2>

          <div className="flex items-center space-x-2">
            {AdminOrEditor && (
              <div className="flex items-center space-x-2">
                {' '}
                <EditFuente id_ubicacion={fuente.id_ubicacion} id={fuente.id} />
                <DeleteFuente
                  id_ubicacion={fuente.id_ubicacion}
                  id={fuente.id}
                  onClose={onClose}
                />
              </div>
            )}

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
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

        <div id="comentarios" className="flex-[1] overflow-y-auto p-4">
          {loading && (
            <div className="mt-4 space-y-3">
              <div className="h-4 w-1/2 rounded bg-gray-300"></div>
              <div className="h-4 w-3/4 rounded bg-gray-300"></div>
            </div>
          )}
          {error && (
            <div className="mt-4 space-y-3">
              <p>{error}</p>
            </div>
          )}
          <ComentariosFuente
            fuente={fuente}
            comentarios={comentarios}
          ></ComentariosFuente>
        </div>
        <div className="border-t bg-gray-50 p-4 sm:p-6">
          <FormComentarioFuente
            fuente={fuente}
            id_user={id_user}
            onComentarioEscrito={handleComentarioEscrito}
          />
        </div>
      </div>
    </div>
  );
}
