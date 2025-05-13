'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const { v4: uuidv4 } = require('uuid');
import { CreateFuenteSchema } from '@/app/lib/schemas/fuentes.schemas';
import { StateFuente } from '@/app/lib/definitions/fuentes.definitions';
import { forbidden } from 'next/navigation';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils';

export async function createFuente(
  prevState: StateFuente,
  formData: FormData,
  apiCall: boolean = false,
) {
  const AdminOrEditor = await checkifUserisAdminOrEditor();
  if (!apiCall && !AdminOrEditor) {
    forbidden();
  }

  const CreateFuenteFormSchema = CreateFuenteSchema.omit({ id: true });
  const validatedFields = CreateFuenteFormSchema.safeParse({
    id_ubicacion: formData.get('id_ubicacion'),
    name: formData.get('name'),
    lat: formData.get('lat'),
    lng: formData.get('lng'),
    imgUrl: formData.get('imgUrl'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos, error al crear la fuente',
    };
  }
  const { id_ubicacion, name, lat, lng, imgUrl } = validatedFields.data;
  try {
    await sql`
      INSERT INTO fuentes (id_ubicacion, name, lat, lng, "imgUrl")
      VALUES (${id_ubicacion}, ${name}, ${lat}, ${lng}, ${imgUrl})
    `;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message ==
        'insert or update on table "fuentes" violates foreign key constraint "id_ubicacion_fkey"'
      ) {
        return {
          errors: {
            id_ubicacion: ['No existe ninguna ubicación con esa ID'],
          },
          message: 'Error: No existe ninguna ubicación con esa ID.',
        };
      } else {
        return {
          message: 'DB Error: No se pudo crear la fuente',
        };
      }
    }
  }
  if (!apiCall) {
    revalidatePath(`/dashboard/ubicaciones/${id_ubicacion}/mapa`);
    redirect(`/dashboard/ubicaciones/${id_ubicacion}/mapa`);
  }
  return {
    message: 'Se ha creado la fuente',
  };
}

export async function updateFuente(
  id: string,
  prevState: StateFuente,
  formData: FormData,
  apiCall: boolean = false,
) {
  const UpdateFuenteFormSchema = CreateFuenteSchema.omit({ id: true });
  const validatedFields = UpdateFuenteFormSchema.safeParse({
    id_ubicacion: formData.get('id_ubicacion'),
    name: formData.get('name'),
    lat: formData.get('lat'),
    lng: formData.get('lng'),
    imgUrl: formData.get('imgUrl'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos, no se pudo editar la fuente.',
    };
  }

  const { id_ubicacion, name, lat, lng, imgUrl } = validatedFields.data;
  try {
    const resultado = await sql`
    UPDATE fuentes
    SET id_ubicacion = ${id_ubicacion}, name = ${name}, lat = ${lat}, lng = ${lng}, "imgUrl" = ${imgUrl}
    WHERE id = ${id}
     `;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message ==
        'insert or update on table "fuentes" violates foreign key constraint "id_ubicacion_fkey"'
      ) {
        return {
          errors: {
            id_ubicacion: ['No existe ninguna ubicación con esa ID'],
          },
          message: 'Error: No existe ninguna ubicación con esa ID.',
        };
      } else {
        return {
          message: 'DB Error: No se pudo editar la fuente',
        };
      }
    }
  }
  if (!apiCall) {
    revalidatePath(`/dashboard/ubicaciones/${id_ubicacion}/mapa`);
    redirect(`/dashboard/ubicaciones/${id_ubicacion}/mapa`);
  }

  return {
    message: 'Se ha editado la fuente.',
  };
}

export async function deleteFuente(
  id_ubicacion: string,
  id: string,
  apiCall: boolean = false,
) {
  try {
    if (!apiCall) {
      const AdminOrEditor = await checkifUserisAdminOrEditor();
      if (!AdminOrEditor) {
        forbidden();
      }
    }
    await sql`DELETE FROM fuentes WHERE id = ${id}`;
    if (!apiCall) {
      revalidatePath(`/dashboard/ubicaciones/${id_ubicacion}/mapa`);
      redirect(`/dashboard/ubicaciones/${id_ubicacion}/mapa`);
    }
  } catch (error) {
    console.error('Error al borrar la ubicación:', error);
    throw error;
  }
}
