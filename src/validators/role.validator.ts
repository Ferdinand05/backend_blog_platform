import z from "zod";

export const roleSchema = z.object({
  role_name: z.string().min(3).max(50),
});
