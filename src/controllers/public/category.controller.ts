import { Request, Response } from "express";
import db from "../../models";
import { ICategory } from "../../types/category";

export async function getAllCategory(req: Request, res: Response) {
  const categories = await db.Category.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  return res.status(200).json({ categories });
}

export async function getDetailCategory(req: Request, res: Response) {
  const { slug } = req.params;

  const category = await db.Category.findOne({
    where: { slug },
    attributes: ["id", "name", "slug", "createdAt"],
  });

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  return res.status(200).json({
    category,
  });
}

export async function getPostsByCategory(req: Request, res: Response) {
  const { slug } = req.params;

  const category = (await db.Category.findOne({
    where: { slug },
  })) as ICategory.Attributes | null;

  if (!category) {
    return res.status(404).json({
      message: "Category slug not found",
    });
  }

  const posts = await db.Post.findAll({
    where: { category_id: category.id },
  });

  return res.status(200).json({
    category: {
      name: category.name,
      slug: category.slug,
    },
    posts,
  });
}
