import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { FuenteField } from '@/app/lib/definitions/fuentes.definitions';

export async function fetchFuentes() {
  try {
    const data = await sql<FuenteField>`
      SELECT
        *
      FROM fuentes
      ORDER BY id_ubicacion ASC
    `;

    const fuentes = data.rows;
    return fuentes;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all fuentes.');
  }
}

export async function fetchFuentes_return_NombreUbicacion() {
  try {
    const data = await sql<FuenteField>`
      SELECT
        fuentes.id,
        fuentes.name,
        fuentes.id_ubicacion,
        fuentes.lat,
        fuentes.lng,
        fuentes."imgUrl",
        ubicaciones.name AS name_ubicacion
      FROM fuentes
      JOIN ubicaciones
      ON fuentes.id_ubicacion = ubicaciones.id
      ORDER BY ubicaciones.name ASC
    `;

    const fuentes = data.rows;
    return fuentes;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all fuentes.');
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
