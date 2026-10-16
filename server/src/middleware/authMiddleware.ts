import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayLoad {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayLoad;
    }
  }
}
