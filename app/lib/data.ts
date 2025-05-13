import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { User } from '@/app/lib/definitions/users.definitions';
import { FuenteField } from '@/app/lib/definitions/fuentes.definitions';
import { UbicacionField } from '@/app/lib/definitions/ubicaciones.definitions';
import { ComentarioField } from './definitions/comentarios.definitions';
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
    return false;
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
    return false;
    // throw new Error('Acceso denegado: no hay ninguna sesión activa');
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

export async function fetchComentarios() {
  try {
    const data = await sql<ComentarioField>`
      SELECT
        *
      FROM comentarios
      ORDER BY fecha_creacion DESC;
    `;
    const comentarios = data.rows;
    return comentarios;
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    throw new Error('No se pudieron obtener los comentarios.');
  }
}

export async function fetchComentarioById(id: string) {
  try {
    const data = await sql<ComentarioField>`
      SELECT *
      FROM comentarios
      WHERE comentarios.id = ${id};
    `;
    const comentario = data.rows;
    return comentario;
  } catch (error) {
    console.error('Error al obtener el comentario:', error);
    throw new Error('No se pudo obtener el comentario.');
  }
}
export async function fetchComentariosByFuente(id: string) {
  try {
    const data = await sql<ComentarioField>`

      SELECT
        comentarios.id,
        comentarios.texto,
        comentarios.fecha_creacion,
        comentarios.id_usuario,
        users.name AS nombre_usuario
      FROM comentarios
      JOIN users
        ON comentarios.id_usuario = users.id
      WHERE comentarios.id_fuente = ${id}
      ORDER BY comentarios.fecha_creacion DESC;
    `;

    const comentarios = data.rows;
    return comentarios;
  } catch (err) {
    console.error('Error al obtener los comentarios:', err);
    throw new Error('No se pudieron obtener los comentarios.');
  }
}

export async function fetchComentariosByUser(id: string) {
  try {
    const data = await sql<ComentarioField>`

      SELECT
        comentarios.id,
        comentarios.texto,
        comentarios.fecha_creacion,
        comentarios.id_usuario,
        users.name AS nombre_usuario
      FROM comentarios
      JOIN users
        ON comentarios.id_usuario = users.id
      WHERE comentarios.id_usuario = ${id}
      ORDER BY comentarios.fecha_creacion DESC;
    `;

    const comentarios = data.rows;
    return comentarios;
  } catch (err) {
    console.error('Error al obtener los comentarios:', err);
    throw new Error('No se pudieron obtener los comentarios.');
  }
}

export async function fetchComentariosByFuenteUser(
  id_fuente: string,
  id_user: string,
) {
  try {
    const data = await sql<ComentarioField>`

      SELECT
        comentarios.id,
        comentarios.texto,
        comentarios.fecha_creacion,
        comentarios.id_usuario,
        users.name AS nombre_usuario
      FROM comentarios
      JOIN users
        ON comentarios.id_usuario = users.id
      WHERE comentarios.id_fuente = ${id_fuente}
        AND comentarios.id_usuario = ${id_user}
      ORDER BY comentarios.fecha_creacion DESC;
    `;

    const comentarios = data.rows;
    return comentarios;
  } catch (err) {
    console.error('Error al obtener los comentarios:', err);
    throw new Error('No se pudieron obtener los comentarios.');
  }
}
