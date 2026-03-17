import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import db from "../../models";

export async function getMe(req: AuthRequest, res: Response) {
  const user = await db.User.findOne({
    where: { id: req.user?.id },
    attributes: {
      exclude: ["password", "updatedAt"],
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

export async function updateProfile(req: AuthRequest, res: Response) {}
