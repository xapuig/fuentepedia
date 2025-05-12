import { NextResponse } from 'next/server';
import { fetchUbicacionById } from '@/app/lib/data';
import { UbicacionField } from '@/app/lib/definitions/ubicaciones.definitions';
import { createUbicacion } from '@/app/lib/actions/ubicaciones.actions';
import { updateUbicacion } from '@/app/lib/actions/ubicaciones.actions';
import { deleteUbicacion } from '@/app/lib/actions/ubicaciones.actions';
import { StateUbicacion } from '@/app/lib/definitions/ubicaciones.definitions';
import { auth } from '@/auth';
import { checkifUserisAdminOrEditor } from '@/app/lib/utils';
const { v4: uuidv4, validate } = require('uuid');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || '';

    if (!id || !validate(id)) {
      return NextResponse.json(
        { error: 'Se requiere una ID válida' },
        { status: 400 },
      );
    }
    const ubicaciones: UbicacionField[] = await fetchUbicacionById(id);
    const ubicacion = ubicaciones[0];
    if (!ubicacion) {
      return NextResponse.json(
        { error: 'Ubicación no encontrada' },
        { status: 404 },
      );
    }
    return NextResponse.json(ubicacion);
  } catch (error) {
    console.error('Error obteniendo ubicacion:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Error desconocido. No se pudo obtener la ubicación',
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
    const AdminOrEditor = await checkifUserisAdminOrEditor();

    if (!AdminOrEditor) {
      return NextResponse.json(
        { error: 'No tienes permiso para crear esta ubicación' },
        { status: 403 },
      );
    }
    const data = await request.json();
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }
    const estado: StateUbicacion = {};
    const ubicacion = await createUbicacion(estado, formData, true);
    if (ubicacion?.errors) {
      return NextResponse.json({ error: ubicacion.errors }, { status: 500 });
    } else {
      return NextResponse.json('Ubicación creada', { status: 201 });
    }
  } catch (error) {
    console.error('Error creando ubicación:', error);
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
        { error: 'No tienes permiso para modificar esta ubicación' },
        { status: 403 },
      );
    }

    const estado: StateUbicacion = {};
    const ubicacion = await updateUbicacion(id, estado, formData, true);
    if (ubicacion?.errors) {
      return NextResponse.json({ error: ubicacion.errors }, { status: 500 });
    } else {
      return NextResponse.json('Ubicación actualizada', { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Error desconocido. No se pudo editar la ubicación',
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || '';
    if (!id || !validate(id)) {
      return NextResponse.json(
        { error: 'Se requiere una ID válida' },
        { status: 400 },
      );
    }
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
        { error: 'No tienes permiso para eliminar esta ubicación' },
        { status: 403 },
      );
    }

    const ubicaciones: UbicacionField[] = await fetchUbicacionById(id);
    const ubicacion = ubicaciones[0];
    if (!ubicacion) {
      return NextResponse.json(
        { error: 'Ubicación no encontrada' },
        { status: 404 },
      );
    }
    await deleteUbicacion(id, true);
    return NextResponse.json('Ubicación borrada', { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Error desconocido. No se pudo borrar la ubicación',
      },
      { status: 500 },
    );
  }
}
