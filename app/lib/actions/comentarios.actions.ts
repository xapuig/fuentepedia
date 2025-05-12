'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const { v4: uuidv4 } = require('uuid');
import { CreateComentarioSchema } from '@/app/lib/schemas/comentarios.schemas';
import { StateComentario } from '@/app/lib/definitions/comentarios.definitions';
import { forbidden } from 'next/navigation';
import { NextResponse } from 'next/server';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils';

export async function createComentario(
  prevState: StateComentario,
  formData: FormData,
  apiCall: boolean = false,
) {
  const CreateComentarioFormSchema = CreateComentarioSchema.omit({ id: true });
  const validatedFields = CreateComentarioFormSchema.safeParse({
    id_fuente: formData.get('id_fuente'),
    id_usuario: formData.get('id_usuario'),
    texto: formData.get('texto'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos, error al crear el comentario',
    };
  }
  const { id_fuente, id_usuario, texto } = validatedFields.data;
  try {
    await sql`
      INSERT INTO comentarios (id_fuente, id_usuario, texto)
      VALUES (${id_fuente}, ${id_usuario}, ${texto})
    `;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message ==
        'insert or update on table "comentarios" violates foreign key constraint "id_fuente_fkey"'
      ) {
        return {
          errors: {
            id_fuente: ['No existe ninguna fuente con esa ID'],
          },
          message: 'Error: No existe ninguna fuente con esa ID.',
        };
      }

      if (
        error.message ===
        'insert or update on table "comentarios" violates foreign key constraint "id_usuario_fkey"'
      ) {
        return {
          errors: {
            id_usuario: ['No existe ningun usuario con esa ID'],
          },
          message: 'Error: No existe ningun usuario con esa ID.',
        };
      }
      console.log(error.message);
      return {
        message: 'DB Error: No se pudo crear el comentario',
      };
    }
  }
  if (!apiCall) {
    revalidatePath(`/dashboard/fuentes/${validatedFields.data.id_fuente}`);
  }
  return {
    message: 'Comentario creado',
  };
}

export async function updateComentario(
  id: string,
  prevState: StateComentario,
  formData: FormData,
  apiCall: boolean = false,
) {
  if (!apiCall) {
    const AdminOrEditor = await checkifUserisAdminOrEditor();
    if (!AdminOrEditor) {
      forbidden();
    }
  }

  const UpdateComentarioFormSchema = CreateComentarioSchema.omit({ id: true });
  const validatedFields = UpdateComentarioFormSchema.safeParse({
    id_fuente: formData.get('id_fuente'),
    id_usuario: formData.get('id_usuario'),
    texto: formData.get('texto'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos, error al crear el comentario',
    };
  }
  const { id_fuente, id_usuario, texto } = validatedFields.data;
  try {
    await sql`
      UPDATE comentarios
      SET
        id_fuente = ${id_fuente},
        id_usuario = ${id_usuario},
        texto = ${texto}
      WHERE
        id = ${id}
    `;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message ==
        'insert or update on table "comentarios" violates foreign key constraint "id_fuente_fkey"'
      ) {
        return {
          errors: {
            id_fuente: ['No existe ninguna fuente con esa ID'],
          },
          message: 'Error: No existe ninguna fuente con esa ID.',
        };
      }

      if (
        error.message ===
        'insert or update on table "comentarios" violates foreign key constraint "id_usuario_fkey"'
      ) {
        return {
          errors: {
            id_usuario: ['No existe ningun usuario con esa ID'],
          },
          message: 'Error: No existe ningun usuario con esa ID.',
        };
      }
      console.log(error.message);
      return {
        message: 'DB Error: No se pudo crear el comentario',
      };
    }
  }
  if (!apiCall) {
    revalidatePath(`/dashboard/fuentes/${validatedFields.data.id_fuente}`);
  }
  return {
    message: 'Comentario actualizado',
  };
}

export async function deleteComentario(id: string, apiCall: boolean = false) {
  try {
    if (!apiCall) {
      const AdminOrEditor = await checkifUserisAdminOrEditor();
      if (!AdminOrEditor) {
        forbidden();
      }
    }
    await sql`
      DELETE FROM comentarios
      WHERE id = ${id}
    `;
    if (!apiCall) {
      revalidatePath(`/dashboard/fuentes/${id}`);
    }
  } catch (error) {
    console.error('Error al eliminar el comentario:', error);
    throw new Error('No se pudo eliminar el comentario.');
  }
}
