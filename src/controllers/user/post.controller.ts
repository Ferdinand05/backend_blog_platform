import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import db from "../../models";
import { createSlug } from "../../utils/slug";
import { deleteImage, uploadImage } from "../../services/upload.services";
import { createPostSchema } from "../../validators/post.validator";
import z, { number } from "zod";

export async function getUserPosts(req: AuthRequest, res: Response) {
  try {
    // ambil query params
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const offset = (page - 1) * limit;

    const { count, rows } = await db.Post.findAndCountAll({
      where: { author_id: req.user?.id! },
      include: [
        {
          model: db.Category,
          as: "category",
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
        {
          model: db.User,
          as: "author",
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
        {
          model: db.Tag,
          as: "tags",
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt"],
      },
      limit,
      offset,
      distinct: true,
    });

    return res.status(200).json({
      posts: rows,
      meta: {
        totalData: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        perPage: limit,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

export async function createUserPost(req: AuthRequest, res: Response) {
  const parsed = createPostSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Error",
      error: z.treeifyError(parsed.error),
    });
  }

  try {
    const { title, content, category_id, status, tags } = parsed.data;

    const author_id = req.user?.id;

    let cover_image: string | null = null;
    let cover_image_public_id: string | null = null;
    if (req.file) {
      const result: any = await uploadImage(req.file);
      cover_image = result.secure_url;
      cover_image_public_id = result.public_id;
    }

    const slug = createSlug(title);

    const post = await db.Post.create({
      title,
      slug,
      content,
      cover_image,
      category_id,
      status,
      author_id,
      views: 0,
      cover_image_public_id,
    });

    if (tags && tags.length > 0) {
      const tagInstances = await db.Tag.findAll({
        where: { id: tags },
      });

      await (post as any).setTags(tagInstances);
    }

    return res.status(201).json({
      message: "Post created",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed create post",
      error,
    });
  }
}

export async function updateUserPost(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const parsed = createPostSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Error",
      error: z.treeifyError(parsed.error),
    });
  }

  try {
    const { title, content, category_id, status, tags } = parsed.data;
    const author_id = req.user?.id;

    const post = (await db.Post.findOne({
      where: { id: Number(id), author_id },
    })) as any;

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (req.file) {
      // upload baru
      const result: any = await uploadImage(req.file);

      // delete lama
      if (post.cover_image_public_id) {
        await deleteImage(post.cover_image_public_id);
      }

      // set baru
      post.cover_image = result.secure_url;
      post.cover_image_public_id = result.public_id;
    }

    post.title = title;
    post.slug = createSlug(title);
    post.content = content;
    post.category_id = category_id;
    post.status = status;

    await post.save();

    if (tags) {
      const tagInstances = await db.Tag.findAll({
        where: { id: tags },
      });
      await post.setTags(tagInstances);
    }

    return res.status(200).json({
      message: "Post updated",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed update post",
      error,
    });
  }
}

export async function deleteUserPost(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const author_id = req.user?.id;

  try {
    const post = (await db.Post.findOne({
      where: { id: Number(id), author_id },
    })) as any;

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.cover_image_public_id) {
      await deleteImage(post.cover_image_public_id);
    }

    await post.destroy();

    return res.status(200).json({
      message: "Post deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed delete post",
      error,
    });
  }
}

export async function updateStatusPost(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const { status } = req.body;
  const post = db.Post.findByPk(Number(id));

  (post as any).update({ status });

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }
}
