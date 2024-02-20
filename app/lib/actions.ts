'use server';

//⬆️ Marcar que todas las funciones que se exportan en este archivo son de servidor y por lo tanto no se ejecuta ni se envían al cliente.
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt'
const { v4: uuidv4 } = require('uuid');

 
const CreateInvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Error, selecciona un cliente.',
  }),
  amount: z.coerce.number().gt(0, { message: 'Error, ingrese una cantidad mayor a $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Error, selecciona un estado para la factura.',
  }),
  date: z.string()
})
 
const CreateInvoiceFormSchema = CreateInvoiceSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoiceFormSchema.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    // Test it out:
    // console.log(rawFormData);
    // console.log(typeof rawFormData.amount);

    // const rawFormData = Object.fromEntries(formData.entries());
    // console.log(rawFormData);
    
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Faltan campos, error al crear la factura',
      };
    }
    const { customerId, amount, status } = validatedFields.data;

    // transformamos para evitar errores de redondeo
    const amountInCents = amount * 100;
    //creamos la fecha actual 2023-11-23
    const [date] = new Date().toISOString().split('T');
    try {
      await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    } catch (error) {
      return {
        message: 'DB Error: No se pudo crear la factura.',
      }
    }
    
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');

    
  }

  // Use Zod to update the expected types
const UpdateInvoice = CreateInvoiceSchema.omit({ id: true, date: true });
 
// ...
 
export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos, no se pudo actualizar la factura.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;

  const amountInCents = amount * 100;
 try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
     `;
 } catch (error) {
   return {
     message: 'DB Error: No se pudo actualizar la factura.',
   }
 }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


export async function deleteInvoice(id: string) {

  throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Factura borrada.' };
  } catch (error) {
    return {
      message: 'DB Error: No se pudo borrar la factura.',
    }
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Usuario o contraseña incorrecta.';
        default:
          return 'Algo salió mal.';
      }
    }
    throw error;
  }
}

const RegisterUser = z.object({
  name: z.string({
    invalid_type_error: 'Por favor escribe tu nombre.',
  }),
  email: z.string({
    invalid_type_error: 'Por favor escribe tu correo electrónico',
  }),
  password: z.string({
    invalid_type_error: 'Por favor escribe tu contraseña.',
  }),
  confirmPassword: z.string({
    invalid_type_error: 'Por favor escribe de nuevo tu contraseña.',
  }),
})

export async function register(
  prevState: string | null,
  formData: FormData,
) {

  const validatedFields = RegisterUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password'),
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return "Faltan campos. Error al crear la cuenta."
  }

  const { name, email, password, confirmPassword } = validatedFields.data

  // Check if passwords match
  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden."
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const id = uuidv4()

  try {
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${id}, ${name}, ${email}, ${hashedPassword})
    `
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'duplicate key value violates unique constraint "users_email_key"') {
        return "Ya existe una cuenta con ese correo electrónico."
      } else {
        return "Error en la base de datos: No se pudo crear la cuenta."
      }
    }
  }

  redirect('/login')
}

const CreateFuenteSchema = z.object({
  id: z.string(),
  ubicacionId: z.string().trim().min(1, { message: "Ubicación requerida" }),
  name: z.string().trim().min(1, { message: "Error, escribe un nombre para la fuente" }),
  lat: z.coerce.number().lt(90, { message: 'Error, escribe un número entre -90 y 90' }).gt(-90, { message: 'Error, escribe un número entre -90 y 90' }),
  lng: z.coerce.number().lt(180, { message: 'Error, escribe un número entre -180 y 180' }).gt(-180, { message: 'Error, escribe un número entre -180 y 180' }),
})
 
const CreateFuenteFormSchema = CreateFuenteSchema.omit({ id: true });

export type State2 = {
  errors?: {
    ubicacionId?: string[];
    name?: string[];
    lat?: string[];
    lng?: string[];
  };
  message?: string | null;
};
export async function createFuente(prevState: State2, formData: FormData) {
  const validatedFields = CreateFuenteFormSchema.safeParse({
    ubicacionId: formData.get('ubicacionId'),
    name: formData.get('name'),
    lat: formData.get('lat'),
    lng: formData.get('lng'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos, error al crear la fuente',
    };
  }
  const { ubicacionId, name, lat, lng } = validatedFields.data;

  try {
    await sql`
    INSERT INTO fuentes (ubicacion_id, name, lat, lng)
    VALUES (${ubicacionId}, ${name}, ${lat}, ${lng})
  `;
  } catch (error) {
    return {
      message: 'DB Error: No se pudo crear la fuente.',
    }
  }
  
revalidatePath(`/dashboard/fuentes/${ubicacionId}`);
redirect(`/dashboard/fuentes/${ubicacionId}`); 
}

const UpdateFuente = CreateFuenteSchema.omit({ id: true});
export async function updateFuente(id: string, prevState: State2, formData: FormData) {
  const validatedFields = UpdateFuente.safeParse({
    ubicacionId: formData.get('ubicacionId'),
    name: formData.get('name'),
    lat: formData.get('lat'),
    lng: formData.get('lng'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos, no se pudo actualizar la fuente.',
    };
  }

  const { ubicacionId, name, lat, lng } = validatedFields.data;
 try {
    await sql`
    UPDATE fuentes
    SET ubicacion_id = ${ubicacionId}, name = ${name}, lat = ${lat}, lng = ${lng}
    WHERE id = ${id}
     `;
 } catch (error) {
   return {
     message: 'DB Error: No se pudo actualizar la fuente.',
   }
 }
 
 revalidatePath(`/dashboard/fuentes/${ubicacionId}`);
 redirect(`/dashboard/fuentes/${ubicacionId}`);
}

export async function deleteFuente(id: string) {

  try {
    await sql`DELETE FROM fuentes WHERE id = ${id}`;
    revalidatePath(`/dashboard/fuentes/${id}`);
    return { message: 'Fuente borrada.' };
  } catch (error) {
    return {
      message: 'DB Error: No se pudo borrar la fuente.',
    }
  }
}



const CreateUbicacionSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, { message: "Error, escribe un nombre para la ubicación" }),
  zipcode: z.string().trim().min(5, { message: "Error, escribe un código postal correcto para la ubicación" }).max(5, { message: "Error, escribe un código postal correcto para la ubicación" }),
  lat: z.coerce.number().lt(90, { message: 'Error, escribe un número entre -90 y 90' }).gt(-90, { message: 'Error, escribe un número entre -90 y 90' }),
  lng: z.coerce.number().lt(180, { message: 'Error, escribe un número entre -180 y 180' }).gt(-180, { message: 'Error, escribe un número entre -180 y 180' }),
})
 
const CreateUbicacionFormSchema = CreateUbicacionSchema.omit({ id: true });
export type State3 = {
  errors?: {
    name?: string[];
    zipcode?: string[];
    lat?: string[];
    lng?: string[];
  };
  message?: string | null;
};
export async function createUbicacion(prevState: State3, formData: FormData) {
  const validatedFields = CreateUbicacionFormSchema.safeParse({
    name: formData.get('name'),
    zipcode: formData.get('zipcode'),
    lat: formData.get('lat'),
    lng: formData.get('lng'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos, error al crear la ubicación',
    };
  }
  const { name, zipcode, lat, lng } = validatedFields.data;

  try {
    await sql`
    INSERT INTO ubicaciones (name, zipcode, lat, lng)
    VALUES (${name}, ${zipcode}, ${lat}, ${lng})
  `;
  } catch (error) {
    return {
      message: 'DB Error: No se pudo crear la ubicación.',
    }
  }
  
revalidatePath(`/dashboard/ubicaciones`);
redirect(`/dashboard/ubicaciones`); 
}

const UpdateUbicacion = CreateUbicacionSchema.omit({ id: true});
export async function updateUbicacion(id: string, prevState: State3, formData: FormData) {
  const validatedFields = UpdateUbicacion.safeParse({
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
   }
 }
 
 revalidatePath(`/dashboard/ubicaciones/${id}`);
 redirect(`/dashboard/ubicaciones/${id}`);
}


export async function deleteUbicacion(id: string) {

  try {
    await sql`DELETE FROM ubicaciones WHERE id = ${id}`;
  } catch (error) {
    return {
      message: 'DB Error: No se pudo borrar la ubicación.',
    }
  }

  revalidatePath(`/dashboard/ubicaciones`);
  redirect(`/dashboard/ubicaciones`);
}