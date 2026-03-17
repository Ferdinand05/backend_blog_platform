import { Request, Response } from "express";
import db from "../../models";
import { ITag } from "../../types/tag";

export async function getAllTag(req: Request, res: Response) {
  const tags = await db.Tag.findAll({
    attributes: ["id", "name", "slug"],
  });

  return res.status(200).json({ tags });
}

export async function getPostsByTag(req: Request, res: Response) {
  const { slug } = req.params;

  const tag = (await db.Tag.findOne({
    where: { slug },
  })) as ITag.Tag | null;

  if (!tag) {
    return res.status(404).json({
      message: "Tag slug not found",
    });
  }

  const posts = await db.Post.findAll({
    include: [
      {
        model: db.Tag,
        as: "tags",
        where: { id: tag.id },
        attributes: ["id", "name", "slug"],
      },
    ],
  });

  return res.status(200).json({
    tag: {
      name: tag.name,
      slug: tag.slug,
    },
    posts,
  });
}
