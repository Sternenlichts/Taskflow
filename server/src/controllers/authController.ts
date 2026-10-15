import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: { first_name, last_name, email, passwordHash },
  });
};
