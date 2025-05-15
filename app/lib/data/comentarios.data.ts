import { sql } from '@vercel/postgres';
import { ComentarioField } from '@/app/lib/definitions/comentarios.definitions';

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

export async function fetchComentarios_returnNombreFuenteNombreUsuario() {
  try {
    const data = await sql<ComentarioField>`

      SELECT
        comentarios.id,
        fuentes.id AS id_fuente,
        comentarios.texto,
        comentarios.fecha_creacion,
        comentarios.id_usuario,
        users.name AS nombre_usuario,
        fuentes.name AS nombre_fuente
      FROM comentarios
      JOIN users
        ON comentarios.id_usuario = users.id
      JOIN fuentes
        ON comentarios.id_fuente = fuentes.id
      ORDER BY comentarios.fecha_creacion ASC;
    `;

    const comentarios = data.rows;
    return comentarios;
  } catch (err) {
    console.error('Error al obtener los comentarios:', err);
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
