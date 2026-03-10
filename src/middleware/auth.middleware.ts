import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtUserPayload } from "../types/jwt";
import { IUser } from "../types/user";

export interface AuthRequest extends Request {
  user?: JwtUserPayload;
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "No token provided." });

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) return res.status(401).json({ error: "Invalid token format" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded as JwtUserPayload;
    next();
  } catch (err: any) {
    if (err.name == "JsonWebTokenError") return res.status(401).json({ error: "Invalid Token" });
    if (err.name == "TokenExpiredError") return res.status(401).json({ error: "Token Expired" });
    return res.status(401).json({ error: err });
  }
}
