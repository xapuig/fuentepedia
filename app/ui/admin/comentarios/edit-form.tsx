'use client';
import { useActionState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateComentario } from '@/app/lib/actions/admin.comentarios.actions';
import { ComentarioField } from '@/app/lib/definitions/comentarios.definitions';

export default function Form({
  comentario,
}: {
  comentario: ComentarioField[];
}) {
  const updateComentarioWithId = updateComentario.bind(null, comentario[0].id);
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(
    updateComentarioWithId,
    initialState,
  );

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function watchReset(e: Event) {
      e.preventDefault();
    }
    const form = formRef.current;
    form?.addEventListener('reset', watchReset);

    return () => {
      form?.removeEventListener('reset', watchReset);
    };
  }, []);
  return (
    <form action={dispatch} ref={formRef}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <input type="hidden" name="id_fuente" value={comentario[0].id_fuente} />
        <input
          type="hidden"
          name="id_usuario"
          value={comentario[0].id_usuario}
        />

        {/* Comentario */}
        <div className="mb-4">
          <label htmlFor="texto" className="mb-2 block text-sm font-medium">
            Edita el texto del comentario
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="texto"
                name="texto"
                placeholder="Escribe el texto que quieras que tenga el comentario"
                defaultValue={comentario[0].texto}
                className="peer block min-h-[80px] w-full resize-none rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="texto-error"
                rows={3}
                required
                minLength={10}
                maxLength={500}
              />
            </div>
          </div>
          <div id="texto-error" aria-live="polite" aria-atomic="true">
            {state.errors?.texto &&
              state.errors.texto.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {state.message && (
          <div className="mt-1 text-sm text-red-500">{state.message}</div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/admin/comentarios/`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar comentario</Button>
      </div>
    </form>
  );
}
