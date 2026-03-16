import { Request, Response } from "express";
import db from "../../models";
import { roleSchema } from "../../validators/role.validator";
import z from "zod";
export async function getAllRole(req: Request, res: Response) {
  const roles = await db.Role.findAll({
    include: {
      model: db.User,
      as: "users",
      attributes: ["id", "username", "email"],
    },
  });

  return res.status(200).json({ roles });
}

export async function createRole(req: Request, res: Response) {
  const parsed = roleSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Error",
      error: z.treeifyError(parsed.error),
    });
  }

  try {
    const { role_name } = parsed.data;

    const role = await db.Role.create({ role_name });

    return res.status(201).json({
      message: "Role created successfully.",
      role,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

export async function updateRole(req: Request, res: Response) {
  const parsed = roleSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Error",
      error: z.treeifyError(parsed.error),
    });
  }

  const { id } = req.params;
  const { role_name } = parsed.data;

  try {
    const role = (await db.Role.findByPk(Number(id))) as any;

    if (!role) {
      return res.status(401).json({ message: "Role not found" });
    }

    role.role_name = role_name;
    await role.save();

    return res.status(201).json({
      message: "Role updated",
      role,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
}
export async function deleteRole(req: Request, res: Response) {
  const { id } = req.params;

  const role = await db.Role.destroy({
    where: { id },
  });

  if (role == 0) {
    return res.status(404).json({ message: "Role not found" });
  }

  return res.status(201).json({ message: "Role deleted" });
}
