import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { User } from '@/app/lib/definitions/users.definitions';
import { auth } from '@/auth';

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
export async function getUsers() {
  try {
    const data = await sql<User>`SELECT id, name, email, role FROM users`;
    const users = data.rows;
    return users;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getUserById(id: string) {
  try {
    const session = await auth();
    const currentUserId = session?.user?.id;
    const admin = await getUserAdmin();

    if (currentUserId !== id && !admin) {
      throw new Error(
        'Acceso denegado: no tienes permiso para ver este perfil',
      );
    }
    const result = await sql`SELECT * FROM users WHERE id = ${id}`;
    const user = result.rows[0] as User;

    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    user.password = '';
    return user;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw new Error('No se pudo obtener el usuario');
  }
}

export async function getUserExists(id: string) {
  try {
    const result = await sql`SELECT * FROM users WHERE id = ${id}`;
    const data = result.rows;
    if (data.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw new Error('No se pudo obtener el usuario');
  }
}
export async function getUserAdmin(apiCall: boolean = false) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return false;
    }

    const result =
      await sql`SELECT * FROM users WHERE id = ${session?.user?.id}`;
    const user = result.rows[0] as User;

    if (user.role == 'admin') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw new Error('No se pudo obtener el usuario');
  }
}

export async function getUserEditor() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return false;
    }
    const result =
      await sql`SELECT * FROM users WHERE id = ${session?.user?.id}`;
    const user = result.rows[0] as User;

    if (user.role == 'editor') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw new Error('No se pudo obtener el usuario');
  }
}
