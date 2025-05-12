import { z } from 'zod';

export const CreateComentarioSchema = z.object({
  id: z.string().uuid({ message: 'Escribe una ID válida' }),
  id_fuente: z
    .string({ message: 'Fuente requerida' })
    .uuid({ message: 'Escribe una ID de fuente válida' }),
  id_usuario: z
    .string({ message: 'Usuario requerido' })
    .uuid({ message: 'Escribe una ID de usuario válida' }),
  texto: z
    .string({ message: 'Escribe un comentario' })
    .trim()
    .min(10, { message: 'Escribe al menos 10 caracteres' })
    .max(500, { message: 'Escribe menos de 500 caracteres' }),
});
