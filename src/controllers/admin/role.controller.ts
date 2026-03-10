import { Request, Response } from "express";
import db from "../../models";

export async function getAllRole(req: Request, res: Response) {
  const roles = await db.Role.findAll();

  return res.status(200).json({ roles });
}
