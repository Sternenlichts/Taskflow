import { Request, Response } from "express";
import { RegisterSchema } from "../validators/authValidator";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const result = RegisterSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.issues });
    }
    const { first_name, last_name, email, password } = result.data;
    const available = await prisma.users.findUnique({ where: { email } });
    if (available) {
      return res.status(400).json({ message: "Такой email уже существует" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: { first_name, last_name, email, passwordHash },
    });
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};
