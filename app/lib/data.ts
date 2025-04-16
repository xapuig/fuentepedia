import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { User, UbicacionField, FuenteField } from './definitions';
const { validate, version } = require('uuid');

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
    // Validar el id, si no es un UUID, devolver null
    if (!validate(id)) {
      return null;
    }

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
    // Validar el id, si no es un UUID, devolver null
    if (!validate(id)) {
      return null;
    }
    noStore();
    const data = await sql<FuenteField>`
      SELECT *
      FROM fuentes
      WHERE fuentes.ubicacion_id = ${id};
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
