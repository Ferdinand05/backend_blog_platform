import { Request, Response } from "express";
import db from "../../models";

export async function getAdminDashboardStats(req: Request, res: Response) {
  try {
    const totalUsers = await db.User.count();

    const totalPosts = await db.Post.count({
      where: { status: "published" },
    });

    const totalDrafts = await db.Post.count({
      where: { status: "draft" },
    });

    const totalViews = await db.Post.sum("views");

    const totalCategories = await db.Category.count();
    const totalTags = await db.Tag.count();

    return res.json({
      totalUsers,
      totalPosts,
      totalDrafts,
      totalViews: totalViews || 0,
      totalCategories,
      totalTags,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
