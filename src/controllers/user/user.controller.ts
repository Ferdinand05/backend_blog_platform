import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import db from "../../models";
import { changePasswordSchema, updateProfileSchema } from "../../validators/user.validator";
import z from "zod";
import { uploadImage } from "../../services/upload.services";
import bcrypt from "bcrypt";

export async function getMe(req: AuthRequest, res: Response) {
  const user = await db.User.findOne({
    where: { id: req.user?.id },
    attributes: {
      exclude: ["password", "updatedAt", "resetPasswordToken"],
    },
    include: {
      model: db.Role,
      as: "role",
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    },
  });

  return res.json({ user });
}

export async function updateProfile(req: AuthRequest, res: Response) {
  const parsed = updateProfileSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Error",
      error: z.treeifyError(parsed.error),
    });
  }

  try {
    const user = (await db.User.findOne({
      where: { id: req.user?.id },
    })) as any;

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { username, bio } = parsed.data;

    if (!username && !bio && !req.file) {
      return res.status(400).json({
        message: "No changes provided",
      });
    }

    if (username) {
      const existing = await db.User.findOne({
        where: { username },
      });
      if (existing && existing.id !== user.id) {
        return res.status(400).json({
          message: "Username already in use",
        });
      }
      user.username = username;
    }

    if (bio) {
      user.bio = bio;
    }

    if (req.file) {
      const result: any = await uploadImage(req.file);
      user.avatar = result.secure_url;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed update profile",
      error,
    });
  }
}

export async function changePassword(req: AuthRequest, res: Response) {
  const parsed = changePasswordSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Error",
      error: z.treeifyError(parsed.error),
    });
  }

  try {
    const user = (await db.User.findOne({
      where: { id: req.user?.id },
    })) as any;

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { current_password, new_password } = parsed.data;

    const isMatching = await bcrypt.compare(current_password, user.password);

    if (!isMatching) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    user.password = new_password;
    await user.save();

    return res.status(200).json({
      message: "Password updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed update password",
      error,
    });
  }
}

export async function getDashboardStats(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  const totalPosts = await db.Post.count({
    where: {
      author_id: userId,
      status: "published",
    },
  });

  const totalDrafts = await db.Post.count({
    where: {
      author_id: userId,
      status: "draft",
    },
  });

  const totalViews = await db.Post.sum("views", {
    where: {
      author_id: userId,
    },
  });

  return res.json({
    totalPosts,
    totalDrafts,
    totalViews: totalViews || 0,
  });
}
