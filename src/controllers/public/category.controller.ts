import { Request, Response } from "express";
import db from "../../models";

export async function getAllCategory(req: Request, res: Response) {
  const categories = await db.Category.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  return res.status(200).json({ categories });
}
