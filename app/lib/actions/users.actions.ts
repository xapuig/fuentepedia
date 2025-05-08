'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
const { v4: uuidv4 } = require('uuid');
import { RegisterUser } from '@/app/lib/schemas/users.schemas';
import { UpdateUserSchema } from '@/app/lib/schemas/users.schemas';
import { StateUpdateUser } from '@/app/lib/definitions/users.definitions';

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

export async function register(prevState: string | null, formData: FormData) {
  const validatedFields = RegisterUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password'),
  });

  if (!validatedFields.success) {
    return 'Faltan campos. Error al crear la cuenta.';
  }

  const { name, email, password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden.';
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  try {
    await sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${id}, ${name}, ${email}, ${hashedPassword})
      `;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message ===
        'duplicate key value violates unique constraint "users_email_key"'
      ) {
        return 'Ya existe una cuenta con ese correo electrónico.';
      } else {
        return 'Error en la base de datos: No se pudo crear la cuenta.';
      }
    }
  }

  redirect('/login');
}

export async function updateUser(
  id: string,
  prevState: StateUpdateUser,
  formData: FormData,
) {
  const validatedFields = UpdateUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
    confirmNewPassword: formData.get('confirmNewPassword'),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos, no se pudo actualizar el usuario.',
    };
  }

  const { name, email, currentPassword, newPassword, confirmNewPassword } =
    validatedFields.data;

  try {
    if (name) {
      await sql`
        UPDATE users
        SET name = ${name}
        WHERE id = ${id}
         `;
    }
    if (email) {
      await sql`
        UPDATE users
        SET email = ${email}
        WHERE id = ${id}
         `;
    }

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await sql`
        UPDATE users
        SET password = ${hashedPassword}
        WHERE id = ${id}
      `;
    }
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message ===
        'duplicate key value violates unique constraint "users_email_key"'
      ) {
        return {
          errors: {
            email: ['Ya existe una cuenta con ese correo electrónico'],
          },
          message: 'Ya existe una cuenta con ese correo electrónico',
        };
      } else {
        return {
          message: 'DB Error: No se pudo actualizar el usuario.',
        };
      }
    }
  }

  revalidatePath(`/dashboard/panel-usuario`);
  redirect(`/dashboard/panel-usuario`);
}
