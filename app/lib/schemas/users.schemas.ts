import { z } from 'zod';

export const RegisterUser = z.object({
  name: z.string({
    invalid_type_error: 'Por favor escribe tu nombre.',
  }),
  email: z
    .string({
      invalid_type_error: 'Por favor escribe tu correo electrónico',
    })
    .email({
      message: 'Por favor escribe un correo electrónico válido.',
    }),
  password: z.string({
    invalid_type_error: 'Por favor escribe tu contraseña.',
  }),
  confirmPassword: z.string({
    invalid_type_error: 'Por favor escribe de nuevo tu contraseña.',
  }),
});

export const UpdateUserSchema = z
  .object({
    name: z.string().trim().optional().nullish(),
    email: z
      .string()
      .email({ message: 'Escribe una dirección de correo electrónico válida' })
      .optional()
      .or(z.literal(''))
      .nullish(),
    currentPassword: z
      .string()
      .min(6, { message: 'La contraseña debe tener mínimo 6 dígitos' })
      .optional()
      .or(z.literal(''))
      .nullish(),
    newPassword: z
      .string()
      .min(6, { message: 'La contraseña debe tener mínimo 6 dígitos' })
      .optional()
      .or(z.literal(''))
      .nullish(),
    confirmNewPassword: z
      .string()
      .min(6, { message: 'La contraseña debe tener mínimo 6 dígitos' })
      .optional()
      .or(z.literal(''))
      .nullish(),
  })
  .refine(
    (data) => {
      if (data.newPassword || data.confirmNewPassword) {
        return Boolean(
          data.currentPassword && data.newPassword && data.confirmNewPassword,
        );
      }
      return true;
    },
    {
      message: 'Completa todos los campos de contraseña',
      path: ['currentPassword'],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && data.confirmNewPassword) {
        return data.newPassword === data.confirmNewPassword;
      }
      return true;
    },
    {
      message: 'Las contraseñas no coinciden',
      path: ['confirmNewPassword'],
    },
  );
