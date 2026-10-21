import { z } from "zod";

export const RegisterSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "Введите минимум 2 символа")
    .max(100, "Введите максимум 100 символов"),
  last_name: z.string().trim().min(2, "Введите минимум 2 символа").max(100),
  email: z.string().trim().toLowerCase().email("Некорректный email"),
  password: z
    .string()
    .min(8, "Введите минимум 8 символов")
    .max(100, "Введите максимум 100 символов")
    .regex(/[A-Z]/, "Нужна заглавная буква")
    .regex(/[0-9]/, "Нужна цифра"),
});

export const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Некорректный email"),
  password: z.string().min(1, "Введите пароль"),
});
