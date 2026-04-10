import { z } from "zod";
import { CategorySchema } from "./category.js";

export const ExpenseSchema = z.object({
  id: z.number().int().positive(),
  amount: z.number().positive(),
  date: z.string().date(),
  note: z.string().nullable(),
  receiptUrl: z.string().url().nullable(),
  categoryId: z.number().int().positive(),
  category: CategorySchema.optional(),
  userId: z.number().int().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ExpenseCreateSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  date: z.string().date("Date must be YYYY-MM-DD"),
  categoryId: z.number().int().positive(),
  note: z.string().max(500).optional().nullable(),
});

export const ExpenseUpdateSchema = ExpenseCreateSchema.partial();

export const ExpenseListResponseSchema = z.object({
  items: z.array(ExpenseSchema),
  total: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
  offset: z.number().int().nonnegative(),
});

export type Expense = z.infer<typeof ExpenseSchema>;
export type ExpenseCreate = z.infer<typeof ExpenseCreateSchema>;
export type ExpenseUpdate = z.infer<typeof ExpenseUpdateSchema>;
export type ExpenseListResponse = z.infer<typeof ExpenseListResponseSchema>;
