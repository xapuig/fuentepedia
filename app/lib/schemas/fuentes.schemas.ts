import { z } from 'zod';

export const CreateFuenteSchema = z.object({
  id: z.string().uuid({ message: 'Escribe una ID válida' }),
  id_ubicacion: z
    .string({ message: 'Ubicación requerida' })
    .uuid({ message: 'Escribe una ID de ubicación válida' }),
  name: z
    .string()
    .trim()
    .min(1, { message: 'Error, escribe un nombre para la fuente' }),
  lat: z.coerce
    .number()
    .lt(90, { message: 'Error, escribe un número entre -90 y 90' })
    .gt(-90, { message: 'Error, escribe un número entre -90 y 90' }),
  lng: z.coerce
    .number()
    .lt(180, { message: 'Error, escribe un número entre -180 y 180' })
    .gt(-180, { message: 'Error, escribe un número entre -180 y 180' }),
  imgUrl: z
    .string()
    .url({ message: 'Error, escribe una URL válida para la imagen' })
    .startsWith('https://i.imgur.com', {
      message:
        'Error, ahora mismo el único servidor de imágenes soportado es Imgur (https://i.imgur.com)',
    }),
});
