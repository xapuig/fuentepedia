'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const { v4: uuidv4 } = require('uuid');
import { CreateUbicacionSchema } from '@/app/lib/schemas/ubicaciones.schemas';
import { StateUbicacion } from '@/app/lib/definitions/ubicaciones.definitions';
import { forbidden } from 'next/navigation';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils';

export async function createUbicacion(
  prevState: StateUbicacion,
  formData: FormData,
  apiCall: boolean = false,
) {
  const AdminOrEditor = await checkifUserisAdminOrEditor();
  if (!apiCall && !AdminOrEditor) {
    forbidden();
  }

  const CreateUbicacionFormSchema = CreateUbicacionSchema.omit({ id: true });
  const validatedFields = CreateUbicacionFormSchema.safeParse({
    name: formData.get('name'),
    zipcode: formData.get('zipcode'),
    lat: formData.get('lat'),
    lng: formData.get('lng'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos, no se pudo crear la ubicación.',
    };
  }

  const { name, zipcode, lat, lng } = validatedFields.data;
  try {
    await sql`
    INSERT INTO ubicaciones (name, zipcode, lat, lng)
    VALUES (${name}, ${zipcode}, ${lat}, ${lng})
  `;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message ===
        'duplicate key value violates unique constraint "ubicaciones_zipcode_key"'
      ) {
        return {
          errors: {
            zipcode: ['Error, ya existe una ubicación con ese código postal'],
          },
          message: 'Ya existe una ubicación con ese código postal.',
        };
      } else {
        return {
          message: 'Error en la base de datos: No se pudo crear la cuenta.',
        };
      }
    }
  }
  if (!apiCall) {
    revalidatePath(`/dashboard/ubicaciones`);
    revalidatePath(`/dashboard/admin/ubicaciones/`);
    redirect(`/dashboard/admin/ubicaciones/`);
  } else {
    return { message: 'Ubicación creada' };
  }
}

export async function updateUbicacion(
  id: string,
  prevState: StateUbicacion,
  formData: FormData,
  apiCall: boolean = false,
) {
  const AdminOrEditor = await checkifUserisAdminOrEditor();
  if (!apiCall && !AdminOrEditor) {
    forbidden();
  }

  const UpdateUbicacionFormSchema = CreateUbicacionSchema.omit({ id: true });
  const validatedFields = UpdateUbicacionFormSchema.safeParse({
    name: formData.get('name'),
    zipcode: formData.get('zipcode'),
    lat: formData.get('lat'),
    lng: formData.get('lng'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos, no se pudo actualizar la ubicación.',
    };
  }

  const { name, zipcode, lat, lng } = validatedFields.data;
  try {
    await sql`
    UPDATE ubicaciones
    SET name = ${name}, zipcode = ${zipcode}, lat = ${lat}, lng = ${lng}
    WHERE id = ${id}
     `;
  } catch (error) {
    return {
      message: 'DB Error: No se pudo actualizar la ubicación.',
    };
  }
  if (!apiCall) {
    revalidatePath(`/dashboard/admin/ubicaciones`);
    redirect(`/dashboard/admin/ubicaciones`);
  } else {
    return { message: 'Ubicación actualizada' };
  }
}

export async function deleteUbicacion(id: string, apiCall: boolean = false) {
  try {
    if (!apiCall) {
      const AdminOrEditor = await checkifUserisAdminOrEditor();
      if (!AdminOrEditor) {
        forbidden();
      }
    }
    await sql`DELETE FROM ubicaciones WHERE id = ${id}`;
  } catch (error) {
    console.error('Error al borrar la ubicación:', error);
    throw error;
  }
  if (!apiCall) {
    revalidatePath(`/dashboard/admin/ubicaciones`);
    redirect(`/dashboard/admin/ubicaciones`);
  }
}
