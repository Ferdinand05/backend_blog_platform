import { Request, Response } from "express";
import db from "../../models";
import { tagSchema } from "../../validators/tag.validator";
import z, { number } from "zod";

export async function getAllTag(req: Request, res: Response) {
  const tags = await db.Tag.findAll();

  return res.status(200).json({ tags });
}

export async function createTag(req: Request, res: Response) {
  const parsed = tagSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Error",
      error: z.treeifyError(parsed.error),
    });
  }

  try {
    const { name } = parsed.data;

    const tag = await db.Tag.create({ name });

    return res.status(201).json({ message: "Tag created successfully.", tag });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

export async function updateTag(req: Request, res: Response) {
  const { id } = req.params;

  const parsed = tagSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Error",
      error: z.treeifyError(parsed.error),
    });
  }

  try {
    const { name } = parsed.data;

    const tag = (await db.Tag.findByPk(Number(id))) as any;

    if (!tag) {
      return res.status(404).json({
        message: "Tag not found",
      });
    }

    tag.name = name;
    await tag.save();

    return res.status(201).json({
      message: "Slug Updated successfully.",
      tag,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

export async function deleteTag(req: Request, res: Response) {
  const { id } = req.params;

  const tag = await db.Tag.destroy({
    where: { id },
  });

  if (!tag) {
    return res.status(404).json({
      message: "Tag not found",
    });
  }

  return res.status(200).json({
    message: "Tag deleted successfully.",
  });
}
