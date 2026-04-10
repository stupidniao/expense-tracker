import { z } from "zod";

export const CategorySpendSchema = z.object({
  categoryId: z.number().int().positive(),
  categoryName: z.string(),
  total: z.number().nonnegative(),
  percentage: z.number().min(0).max(100),
});

export const ReportSummarySchema = z.object({
  startDate: z.string().date(),
  endDate: z.string().date(),
  totalSpend: z.number().nonnegative(),
  byCategory: z.array(CategorySpendSchema),
});

export const TrendPointSchema = z.object({
  date: z.string(),
  total: z.number().nonnegative(),
});

export const ReportTrendSchema = z.object({
  granularity: z.enum(["day", "month"]),
  points: z.array(TrendPointSchema),
});

export type CategorySpend = z.infer<typeof CategorySpendSchema>;
export type ReportSummary = z.infer<typeof ReportSummarySchema>;
export type TrendPoint = z.infer<typeof TrendPointSchema>;
export type ReportTrend = z.infer<typeof ReportTrendSchema>;
