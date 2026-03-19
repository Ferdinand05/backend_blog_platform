import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(5).max(150),
  content: z.string().min(10),
  category_id: z.coerce.number().int(),
  status: z.enum(["draft", "published"]).optional().default("draft"),
  tags: z
    .string()
    .transform((val) => JSON.parse(val))
    .pipe(z.array(z.number()))
    .optional(),
});
