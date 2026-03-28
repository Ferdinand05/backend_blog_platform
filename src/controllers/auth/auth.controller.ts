import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../../validators/auth.validator";
import db from "../../models";
import bcrypt from "bcrypt";
import { IRole } from "../../types/role";
import z from "zod";
import { IUser } from "../../types/user";
import { signToken } from "../../utils/jwt";

export async function register(req: Request, res: Response) {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Validation error",
      error: z.treeifyError(result.error),
    });
  }
  const { email, username, password }: IUser.RegisterRequest = result.data;
  const existing = await db.User.findOne({
    where: { email: email },
  });
  if (existing)
    return res.status(400).json({
      message: "Email already exist",
    });

  const role = (await db.Role.findOne({
    where: { role_name: "author" },
  })) as IRole.Role | null;

  if (!role) {
    return res.status(400).json({
      message: "Author role not found",
    });
  }

  const user = await db.User.create({
    email,
    username,
    password,
    role_id: role.id,
  });
  return res.status(200).json({
    message: "User registered successfully.",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Error",
      error: z.treeifyError(parsed.error),
    });
  }

  const { email, password }: IUser.LoginRequest = parsed.data;

  try {
    const user = (await db.User.findOne({
      where: { email: email },
      include: {
        model: db.Role,
        as: "role",
      },
    })) as IUser.Attributes | null;

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const isMatching = await bcrypt.compare(password, user.password);

    if (!isMatching) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    // update last login
    await db.User.update(
      { lastLogin: new Date() },
      {
        where: { id: user.id },
      },
    );

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: (user.role as IRole.Role)?.role_name,
    };

    const token = signToken(payload);

    return res.status(200).json({
      message: "Login successfully.",
      token: token,
      user: payload,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
      error: err,
    });
  }
}
