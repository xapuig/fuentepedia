import { z } from 'zod';

export const UpdateComentarioSchema = z.object({
  id: z.string().uuid({ message: 'Escribe una ID válida' }),
  texto: z
    .string({ message: 'Escribe un comentario' })
    .trim()
    .min(10, { message: 'Escribe al menos 10 caracteres' })
    .max(500, { message: 'Escribe menos de 500 caracteres' })
    .optional()
    .or(z.literal(''))
    .nullish(),
});
