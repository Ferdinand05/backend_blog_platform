import { Request, Response } from "express";
import db from "../../models";
import { userSchema, userUpdateSchema } from "../../validators/user.validator";
import z from "zod";

export async function getAllUser(req: Request, res: Response) {
  const users = await db.User.findAll({
    attributes: {
      exclude: ["password", "resetPasswordToken"],
    },
    include: {
      model: db.Role,
      as: "role",
      attributes: ["id", "role_name", "slug"],
    },
  });

  return res.status(200).json({
    users,
  });
}

export async function createUser(req: Request, res: Response) {
  const parsed = userSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Error",
      error: z.treeifyError(parsed.error),
    });
  }

  const { username, email, password, role_id } = parsed.data;

  const role = await db.Role.findOne({
    where: { id: role_id },
  });
  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  try {
    const user = await db.User.create({
      username,
      email,
      password,
      role_id,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const parsed = userUpdateSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Error",
      error: z.treeifyError(parsed.error),
    });
  }

  const { username, role_id } = parsed.data;

  const role = await db.Role.findOne({
    where: { id: role_id },
  });
  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  try {
    const user = await db.User.update(
      {
        username,
        role_id,
      },
      {
        where: { id },
      },
    );

    if (user[0] == 0) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.status(201).json({
      message: "User Updated successfully.",
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  const user = await db.User.destroy({
    where: { id },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    message: "User deleted successfully.",
  });
}
