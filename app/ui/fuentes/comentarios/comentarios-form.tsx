'use client';

import { useState, useActionState, useEffect, useRef, use } from 'react';
import styles from '@/app/ui/home.module.css';
import { FuenteField } from '@/app/lib/definitions/fuentes.definitions';
import { createComentario } from '@/app/lib/actions/comentarios.actions';
import { Button } from '@/app/ui/button';
import { generatePagination } from '@/app/lib/utils';
import { on } from 'events';

export function FormComentarioFuente({
  fuente,
  id_user,
  onComentarioEscrito,
}: {
  fuente: FuenteField;
  id_user: string | undefined;
  onComentarioEscrito: () => void;
}) {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(createComentario, initialState);
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
    <div className={styles.homeWrapper}>
      <form
        id="comentarios-form"
        action={dispatch}
        ref={formRef}
        onSubmit={onComentarioEscrito}
      >
        <input type="hidden" name="id_fuente" value={fuente.id} />
        <input type="hidden" name="id_usuario" value={id_user} />
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Comentario */}
          <div className="mb-4">
            <label htmlFor="texto" className="mb-2 block text-sm font-medium">
              Escribe el comentario
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <textarea
                  id="texto"
                  name="texto"
                  placeholder="Escribe el texto que quieras escribir"
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
          {state.message != 'Comentario creado' ? (
            <div className="bold mt-1 text-sm text-red-500">
              {state.message}
            </div>
          ) : (
            <div className="bold mt-1 text-sm text-blue-500">
              {state.message}
            </div>
          )}
          <div className="mt-6 flex justify-end gap-4">
            <Button type="submit" form="comentarios-form">
              Escribir comentario
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
