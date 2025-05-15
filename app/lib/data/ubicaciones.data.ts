import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { UbicacionField } from '@/app/lib/definitions/ubicaciones.definitions';

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
