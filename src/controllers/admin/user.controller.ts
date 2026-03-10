import { Request, Response } from "express";
import db from "../../models";

export async function getAllUser(req: Request, res: Response) {
  const users = await db.User.findAll({
    attributes: {
      exclude: ["password", "resetPasswordToken"],
    },
  });

  return res.status(200).json({
    users,
  });
}
