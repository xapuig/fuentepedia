import { z } from 'zod';

export const CreateUbicacionSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .trim()
    .min(1, { message: 'Error, escribe un nombre para la ubicación' }),
  zipcode: z
    .string()
    .trim()
    .min(5, {
      message: 'Error, escribe un código postal correcto para la ubicación',
    })
    .max(5, {
      message: 'Error, escribe un código postal correcto para la ubicación',
    }),
  lat: z.coerce
    .number()
    .lt(90, { message: 'Error, escribe un número entre -90 y 90' })
    .gt(-90, { message: 'Error, escribe un número entre -90 y 90' }),
  lng: z.coerce
    .number()
    .lt(180, { message: 'Error, escribe un número entre -180 y 180' })
    .gt(-180, { message: 'Error, escribe un número entre -180 y 180' }),
});
