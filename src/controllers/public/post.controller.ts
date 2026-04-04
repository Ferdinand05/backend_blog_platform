import { Request, Response } from "express";
import db from "../../models";
import Category from "../../models/Category";
import crypto from "crypto";
export async function getAllPost(req: Request, res: Response) {
  const limit = Number(req.query.limit) || 8;
  const offset = Number(req.query.offset) || 0;

  const posts = await db.Post.findAll({
    where: { status: "published" },
    limit,
    offset,
    order: [["createdAt", "ASC"]],
    include: [
      {
        model: Category,
        as: "category",
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      },
      {
        model: db.User,
        as: "author",
        attributes: {
          exclude: ["updatedAt", "createdAt", "resetPasswordToken", "lastLogin"],
        },
      },
      {
        model: db.Tag,
        as: "tags",
        attributes: ["id", "name", "slug"],
      },
    ],
    attributes: {
      exclude: ["updatedAt"],
    },
  });

  return res.status(200).json({ posts });
}

export async function getPost(req: Request, res: Response) {
  const { slug } = req.params;

  const post = await db.Post.findOne({
    where: { slug },
    attributes: {
      exclude: ["cover_image_public_id"],
    },
    include: [
      {
        model: db.Category,
        as: "category",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: db.User,
        as: "author",
        attributes: {
          exclude: ["password", "updatedAt", "resetPasswordToken", "lastLogin"],
        },
      },
      {
        model: db.Tag,
        as: "tags",
        attributes: ["id", "name", "slug"],
      },
    ],
  });

  if (!post) {
    return res.status(404).json({
      message: "Post not found!",
    });
  }

  const rawIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || "unknown";

  const hashedIp = crypto.createHash("md5").update(rawIp).digest("hex");

  const cookieKey = `viewed_post_${(post as any).id}_${hashedIp}`;

  const alreadyViewed = req.cookies[cookieKey];

  if (!alreadyViewed) {
    await post.increment("views");

    res.cookie(cookieKey, "1", {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return res.status(200).json({
    post,
  });
}
