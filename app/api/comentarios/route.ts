import { NextResponse } from 'next/server';
import {
  fetchComentariosByFuente,
  fetchComentariosByFuenteUser,
  fetchComentarioById,
  fetchComentariosByUser,
  fetchComentarios,
} from '@/app/lib/data';
import {
  FuenteField,
  StateFuente,
} from '@/app/lib/definitions/fuentes.definitions';
import {
  ComentarioField,
  StateComentario,
} from '@/app/lib/definitions/comentarios.definitions';
import {
  createComentario,
  updateComentario,
  deleteComentario,
} from '@/app/lib/actions/comentarios.actions';
import { auth } from '@/auth';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
const { v4: uuidv4, validate } = require('uuid');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id') || '';
    const id_fuente = searchParams.get('id_fuente') || '';
    const id_usuario = searchParams.get('id_usuario') || '';

    if (id_fuente == '' && id_usuario == '' && id == '') {
      const comentarios: ComentarioField[] = await fetchComentarios();
      if (comentarios.length == 0) {
        return NextResponse.json(
          { error: 'No se encontraron comentarios' },
          { status: 404 },
        );
      } else {
        return NextResponse.json(comentarios);
      }
    }

    if (id != '' && id_fuente == '' && id_usuario == '') {
      if (!validate(id)) {
        return NextResponse.json(
          { error: 'Se requiere una ID válida' },
          { status: 400 },
        );
      }
      const comentarios: ComentarioField[] = await fetchComentarioById(id);
      const comentario = comentarios[0];
      if (!comentario) {
        return NextResponse.json(
          { error: 'Comentario no encontrado' },
          { status: 404 },
        );
      } else {
        return NextResponse.json(comentario);
      }
    }

    if (id_fuente != '' && id_usuario == '' && id == '') {
      if (!validate(id_fuente)) {
        return NextResponse.json(
          { error: 'Se requiere una ID de fuente válida' },
          { status: 400 },
        );
      }
      const comentarios: ComentarioField[] =
        await fetchComentariosByFuente(id_fuente);
      if (comentarios.length == 0) {
        return NextResponse.json(
          { error: 'No se encontraron comentarios para esta fuente' },
          { status: 404 },
        );
      } else {
        return NextResponse.json(comentarios);
      }
    }

    if (id_usuario != '' && id_fuente == '' && id == '') {
      if (!validate(id_usuario)) {
        return NextResponse.json(
          { error: 'Se requiere una ID de usuario válida' },
          { status: 400 },
        );
      }
      const comentarios: ComentarioField[] =
        await fetchComentariosByUser(id_usuario);
      if (comentarios.length == 0) {
        return NextResponse.json(
          { error: 'No se encontraron comentarios para este usuario' },
          { status: 404 },
        );
      } else {
        return NextResponse.json(comentarios);
      }
    }

    if (id_fuente != '' && id_usuario != '' && id == '') {
      if (!validate(id_fuente)) {
        return NextResponse.json(
          { error: 'Se requiere una ID de fuente válida' },
          { status: 400 },
        );
      }
      if (!validate(id_usuario)) {
        return NextResponse.json(
          { error: 'Se requiere una ID de usuario válida' },
          { status: 400 },
        );
      }

      const comentarios: ComentarioField[] = await fetchComentariosByFuenteUser(
        id_fuente,
        id_usuario,
      );
      if (comentarios.length == 0) {
        return NextResponse.json(
          { error: 'No se encontraron comentarios para esta fuente y usuario' },
          { status: 404 },
        );
      } else {
        return NextResponse.json(comentarios);
      }
    }
  } catch (error) {
    console.error('Error obteniendo comentarios', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Error desconocido. No se pudo obtener el comentario',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'Sesión no iniciada' },
        { status: 401 },
      );
    }
    const data = await request.json();
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }
    const estado: StateComentario = {};
    const comentario = await createComentario(estado, formData, true);
    if (comentario?.errors) {
      return NextResponse.json(
        { error: comentario.errors, message: comentario?.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json('Comentario creado', { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Error desconocido. No se pudo crear el comentario',
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'Sesión no iniciada' },
        { status: 401 },
      );
    }
    const AdminOrEditor = await checkifUserisAdminOrEditor();
    if (!AdminOrEditor) {
      return NextResponse.json(
        { error: 'No tienes permiso para editar este comentario' },
        { status: 403 },
      );
    }

    const data = await request.json();
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const id = formData.get('id') as string;

    if (!id || !validate(id)) {
      return NextResponse.json(
        { error: 'Se requiere una ID de comentario válida' },
        { status: 400 },
      );
    }
    const comentario = await fetchComentarioById(id);
    if (comentario.length === 0) {
      return NextResponse.json(
        { error: 'Comentario no encontrado' },
        { status: 404 },
      );
    }
    const estado: StateComentario = {};
    const accion_editarComentario = await updateComentario(
      id,
      estado,
      formData,
      true,
    );
    if (accion_editarComentario?.errors) {
      return NextResponse.json(
        { error: accion_editarComentario.errors },
        { status: 500 },
      );
    } else {
      return NextResponse.json('Comentario editado', {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Error desconocido. No se pudo actualizar el comentario',
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'Sesión no iniciada' },
        { status: 401 },
      );
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || '';
    if (!id || !validate(id)) {
      return NextResponse.json(
        { error: 'Se requiere una ID de comentario válida' },
        { status: 400 },
      );
    }
    const AdminOrEditor = await checkifUserisAdminOrEditor();
    if (!AdminOrEditor) {
      return NextResponse.json(
        { error: 'No tienes permiso para eliminar esta fuente' },
        { status: 403 },
      );
    }

    const comentarios: ComentarioField[] = await fetchComentarioById(id);
    const comentario = comentarios[0];
    if (!comentario) {
      return NextResponse.json(
        { error: 'Comentario no encontrado' },
        { status: 404 },
      );
    }
    await deleteComentario(id, true);
    return NextResponse.json('Comentario borrado', { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Error desconocido. No se pudo borrar el comentario',
      },
      { status: 500 },
    );
  }
}
