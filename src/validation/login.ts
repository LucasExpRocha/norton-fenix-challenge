import { z } from 'zod';

export const userSchema = z
  .string()
  .min(1, { message: 'Informe o usuário' })
  .refine(
    (val) => {
      const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const cpf = /^\d{11}$/;
      const passport = /^[A-Za-z0-9]{6,12}$/;
      return email.test(val) || cpf.test(val) || passport.test(val);
    },
    { message: 'Insira e-mail, CPF ou passaporte válido' }
  );
