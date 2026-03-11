import { Request, Response } from "express";
import db from "../../models";
import Category from "../../models/Category";

export async function getAllPost(req: Request, res: Response) {
  const posts = await db.Post.findAll({
    include: {
      model: Category,
      as: "category",
    },
    attributes: {
      exclude: ["updated_at"],
    },
  });

  return res.status(200).json({ posts });
}
