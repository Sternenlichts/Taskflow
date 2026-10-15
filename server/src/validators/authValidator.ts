import { z } from "zod";

export const RegisterSchema = z.object({
  first_name: z.string().trim().min(2, "Введите минимум 2 символа"),
  last_name: z.string().trim().min(2, "Введите минимум 2 символа"),
  email: z.string().trim().toLowerCase().email("Некорректный email"),
  password: z.string().min(8, "Введите минимум 8 символов"),
});

export const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Некорректный email"),
  password: z.string().min(1, "Введите пароль"),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
