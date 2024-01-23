'use server';

//⬆️ Marcar que todas las funciones que se exportan en este archivo son de servidor y por lo tanto no se ejecuta ni se envían al cliente.
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
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
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}