import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(50),
  icon: z.string().nullable(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).nullable(),
  userId: z.number().int().positive(),
});

export const CategoryCreateSchema = z.object({
  name: z.string().min(1).max(50),
  icon: z.string().optional().nullable(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().nullable(),
});

export const CategoryUpdateSchema = CategoryCreateSchema.partial();

export type Category = z.infer<typeof CategorySchema>;
export type CategoryCreate = z.infer<typeof CategoryCreateSchema>;
export type CategoryUpdate = z.infer<typeof CategoryUpdateSchema>;
