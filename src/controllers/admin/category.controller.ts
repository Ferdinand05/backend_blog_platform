import { Request, Response } from "express";
import db from "../../models";
import { categorySchema } from "../../validators/category.validator";
import z from "zod";
import { ICategory } from "../../types/category";
import { InferCreationAttributes } from "sequelize";

export async function getAllCategory(req: Request, res: Response) {
  const categories = await db.Category.findAll();

  return res.status(200).json({ categories });
}

export async function createCategory(req: Request, res: Response) {
  const parsed = categorySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Error",
      error: z.treeifyError(parsed.error),
    });
  }

  const { name } = parsed.data;

  try {
    const category = await db.Category.create({ name });

    return res.status(201).json({
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

export async function updateCategory(req: Request, res: Response) {
  const parsed = categorySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Error",
      error: z.treeifyError(parsed.error),
    });
  }

  const { id } = req.params;
  const { name } = parsed.data;

  const category = (await db.Category.findByPk(Number(id))) as any;

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  category.name = name;
  await category.save();

  return res.status(201).json({ message: "Category updated", category });
}

export async function deleteCategory(req: Request, res: Response) {
  const { id } = req.params;

  const category = await db.Category.destroy({
    where: { id },
  });

  if (category == 0) {
    return res.status(404).json({ message: "Category not found" });
  }

  return res.status(200).json({ message: "Category deleted", category });
}
