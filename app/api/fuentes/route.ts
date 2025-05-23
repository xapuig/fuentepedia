import { NextResponse } from 'next/server';
import {
  fetchFuentesByUbicacionId,
  fetchFuenteById,
} from '@/app/lib/data/fuentes.data';
import {
  FuenteField,
  StateFuente,
} from '@/app/lib/definitions/fuentes.definitions';
import { createFuente } from '@/app/lib/actions/fuentes.actions';
import { updateFuente } from '@/app/lib/actions/fuentes.actions';
import { deleteFuente } from '@/app/lib/actions/fuentes.actions';
import { auth } from '@/auth';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
const { v4: uuidv4, validate } = require('uuid');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || '';
    const id_ubicacion = searchParams.get('id_ubicacion') || '';

    if (id_ubicacion != '' && id != '') {
      return NextResponse.json(
        {
          error:
            'Por favor, escribe solamente la ID de una fuente o de una ubicación, no de ambas',
        },
        { status: 400 },
      );
    }

    if (id_ubicacion != '' && !validate(id_ubicacion)) {
      return NextResponse.json(
        { error: 'Se requiere una ID de ubicación válida' },
        { status: 400 },
      );
    }

    if (id_ubicacion == '') {
      if (!id || !validate(id)) {
        return NextResponse.json(
          { error: 'Se requiere una ID válida' },
          { status: 400 },
        );
      }
      const fuentes: FuenteField[] = await fetchFuenteById(id);
      const fuente = fuentes[0];
      if (!fuente) {
        return NextResponse.json(
          { error: 'Fuente no encontrada' },
          { status: 404 },
        );
      } else {
        return NextResponse.json(fuente);
      }
    } else {
      const fuentes: FuenteField[] =
        await fetchFuentesByUbicacionId(id_ubicacion);
      const fuente_encontrada = fuentes[0];
      if (!fuente_encontrada) {
        return NextResponse.json(
          { error: 'No se encontraron fuentes para esta ubicación' },
          { status: 404 },
        );
      } else {
        return NextResponse.json(fuentes);
      }
    }
  } catch (error) {
    console.error('Error obteniendo fuentes', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Error desconocido. No se pudo obtener la fuente',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Sesión no iniciada' },
        { status: 401 },
      );
    }
    const AdminOrEditor = await checkifUserisAdminOrEditor();

    if (!AdminOrEditor) {
      return NextResponse.json(
        { error: 'No tienes permiso para crear esta fuente' },
        { status: 403 },
      );
    }
    const data = await request.json();
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    const id_ubicacion = formData.get('id_ubicacion');
    if (!validate(id_ubicacion)) {
      return NextResponse.json(
        { error: 'Se requiere una ID de ubicación válida' },
        { status: 400 },
      );
    }
    const estado: StateFuente = {};
    const fuente = await createFuente(estado, formData, true);
    if (fuente?.errors) {
      return NextResponse.json(
        { error: fuente.errors, message: fuente?.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json('Fuente creada', { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Error desconocido. No se pudo crear la ubicación',
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Sesión no iniciada' },
        { status: 401 },
      );
    }
    const AdminOrEditor = await checkifUserisAdminOrEditor();

    if (!AdminOrEditor) {
      return NextResponse.json(
        { error: 'No tienes permiso para modificar esta ubicación' },
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
        { error: 'Se requiere una ID válida' },
        { status: 400 },
      );
    }
    const fuente = await fetchFuenteById(id);
    if (fuente.length == 0) {
      return NextResponse.json(
        { error: 'Fuente no encontrada' },
        { status: 404 },
      );
    }

    const estado: StateFuente = {};
    const accion_editarfuente = await updateFuente(id, estado, formData, true);
    if (accion_editarfuente?.errors) {
      return NextResponse.json(
        { error: accion_editarfuente.errors },
        { status: 500 },
      );
    } else {
      return NextResponse.json('Fuente editada', {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Error desconocido. No se pudo editar la fuente',
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Sesión no iniciada' },
        { status: 401 },
      );
    }
    const AdminOrEditor = await checkifUserisAdminOrEditor();
    if (!AdminOrEditor) {
      return NextResponse.json(
        { error: 'No tienes permiso para eliminar esta fuente' },
        { status: 403 },
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || '';
    if (!id || !validate(id)) {
      return NextResponse.json(
        { error: 'Se requiere una ID válida' },
        { status: 400 },
      );
    }

    const fuentes: FuenteField[] = await fetchFuenteById(id);
    const fuente = fuentes[0];
    if (!fuente) {
      return NextResponse.json(
        { error: 'Fuente no encontrada' },
        { status: 404 },
      );
    }
    const id_ubicacion = fuente.id_ubicacion;
    await deleteFuente(id_ubicacion, id, true);
    return NextResponse.json('Fuente borrada', { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Error desconocido. No se pudo borrar la fuente',
      },
      { status: 500 },
    );
  }
}
