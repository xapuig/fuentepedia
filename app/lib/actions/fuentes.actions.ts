'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const { v4: uuidv4 } = require('uuid');
import { CreateFuenteSchema } from '@/app/lib/schemas/fuentes.schemas';
import { StateFuente } from '@/app/lib/definitions/fuentes.definitions';
import { forbidden } from 'next/navigation';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils';

export async function createFuente(prevState: StateFuente, formData: FormData) {
  const CreateFuenteFormSchema = CreateFuenteSchema.omit({ id: true });
  const validatedFields = CreateFuenteFormSchema.safeParse({
    ubicacionId: formData.get('ubicacionId'),
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
  const { ubicacionId, name, lat, lng, imgUrl } = validatedFields.data;
  try {
    await sql`
      INSERT INTO fuentes (ubicacion_id, name, lat, lng, "imgUrl")
      VALUES (${ubicacionId}, ${name}, ${lat}, ${lng}, ${imgUrl})
    `;
  } catch (error) {
    return {
      message: 'DB Error: No se pudo crear la fuente.',
    };
  }

  revalidatePath(`/dashboard/ubicaciones/${ubicacionId}/mapa`);
  redirect(`/dashboard/ubicaciones/${ubicacionId}/mapa`);
}

export async function updateFuente(
  id: string,
  prevState: StateFuente,
  formData: FormData,
) {
  const UpdateFuenteFormSchema = CreateFuenteSchema.omit({ id: true });
  const validatedFields = UpdateFuenteFormSchema.safeParse({
    ubicacionId: formData.get('ubicacionId'),
    name: formData.get('name'),
    lat: formData.get('lat'),
    lng: formData.get('lng'),
    imgUrl: formData.get('imgUrl'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos, no se pudo actualizar la fuente.',
    };
  }

  const { ubicacionId, name, lat, lng, imgUrl } = validatedFields.data;
  try {
    await sql`
    UPDATE fuentes
    SET ubicacion_id = ${ubicacionId}, name = ${name}, lat = ${lat}, lng = ${lng}, "imgUrl" = ${imgUrl}
    WHERE id = ${id}
     `;
  } catch (error) {
    return {
      message: 'DB Error: No se pudo actualizar la fuente.',
    };
  }

  revalidatePath(`/dashboard/ubicaciones/${ubicacionId}/mapa`);
  redirect(`/dashboard/ubicaciones/${ubicacionId}/mapa`);
}

export async function deleteFuente(ubicacionId: string, id: string) {
  try {
    await sql`DELETE FROM fuentes WHERE id = ${id}`;
    revalidatePath(`/dashboard/ubicaciones/${ubicacionId}/mapa`);
    return { message: 'Fuente borrada.' };
  } catch (error) {
    return {
      message: 'DB Error: No se pudo borrar la fuente.',
    };
  }
}
