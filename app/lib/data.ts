import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { User } from '@/app/lib/definitions/users.definitions';
import { FuenteField } from '@/app/lib/definitions/fuentes.definitions';
import { UbicacionField } from '@/app/lib/definitions/ubicaciones.definitions';
import { auth } from '@/auth';

export async function fetchUbicaciones() {
  try {
    const data = await sql<UbicacionField>`
      SELECT
        *
      FROM ubicaciones
      ORDER BY name ASC
    `;

    const ubicaciones = data.rows;
    return ubicaciones;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all ubicaciones.');
  }
}

export async function fetchUbicacionById(id: string) {
  try {
    noStore();
    const data = await sql<UbicacionField>`
      SELECT *
      FROM ubicaciones
      WHERE ubicaciones.id = ${id};
    `;
    const ubicacion = data.rows;
    return ubicacion;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ubicacion.');
  }
}

export async function fetchFuenteById(id: string) {
  try {
    noStore();
    const data = await sql<FuenteField>`
      SELECT *
      FROM fuentes
      WHERE fuentes.id = ${id};
    `;
    const fuente = data.rows;
    return fuente;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch fuente.');
  }
}

export async function fetchFuentesByUbicacionId(id: string) {
  try {
    noStore();
    const data = await sql<FuenteField>`
      SELECT *
      FROM fuentes
      WHERE fuentes.id_ubicacion = ${id};
    `;
    const fuente = data.rows;
    return fuente;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ubicacion.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getUserById(id: string) {
  const session = await auth(); // Obtiene la sesión del usuario actual
  const currentUserId = session?.user?.id;

  if (currentUserId !== id) {
    throw new Error('Acceso denegado: no tienes permiso para ver este perfil');
  }

  try {
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

export async function getUserAdmin(apiCall: boolean = false) {
  const session = await auth(); // Obtiene la sesión del usuario actual

  if (!session) {
    throw new Error('Acceso denegado: no hay ninguna sesión activa');
  }

 
  try {
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
  const session = await auth(); // Obtiene la sesión del usuario actual
  if (!session) {
    throw new Error('Acceso denegado: no hay ninguna sesión activa');
  }

  try {
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
