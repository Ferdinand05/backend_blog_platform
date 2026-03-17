import z from "zod";

export const userSchema = z.object({
  username: z.string().min(3).max(100),
  email: z.email(),
  password: z.string().min(7),
  role_id: z.int(),
});

export const userUpdateSchema = z.object({
  username: z.string().min(3).max(100),
  role_id: z.int(),
});

export const updateProfileSchema = z.object({
  username: z.string().min(3).max(100).optional(),
  bio: z.string().min(3).optional(),
});

export const changePasswordSchema = z.object({
  current_password: z.string().min(7),
  new_password: z.string().min(7),
});
