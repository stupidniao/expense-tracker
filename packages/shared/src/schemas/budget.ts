import { z } from "zod";

export const BudgetPeriodSchema = z.enum(["monthly", "custom"]);

export const BudgetSchema = z.object({
  id: z.number().int().positive(),
  categoryId: z.number().int().positive(),
  periodType: BudgetPeriodSchema,
  startDate: z.string().date(),
  endDate: z.string().date(),
  limitAmount: z.number().positive(),
  spent: z.number().nonnegative(),
  remaining: z.number(),
  overBudget: z.boolean(),
  userId: z.number().int().positive(),
});

export const BudgetCreateSchema = z.object({
  categoryId: z.number().int().positive(),
  periodType: BudgetPeriodSchema,
  startDate: z.string().date(),
  endDate: z.string().date(),
  limitAmount: z.number().positive("Limit must be positive"),
});

export const BudgetUpdateSchema = BudgetCreateSchema.partial();

export type Budget = z.infer<typeof BudgetSchema>;
export type BudgetCreate = z.infer<typeof BudgetCreateSchema>;
export type BudgetUpdate = z.infer<typeof BudgetUpdateSchema>;
