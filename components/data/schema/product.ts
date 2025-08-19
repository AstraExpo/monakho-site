import { z } from "zod";

// ---------Product Schema for product validation---------
export const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price"),
  stock: z.string().regex(/^\d+$/, "Stock must be a number"),
  category: z.enum(["Apparel", "Books", "Music", "Accessories", "Digital", "Other"]),
  status: z.enum(["Active", "Inactive"]).default("Active"),
  isFeatured: z.boolean().default(false),
});

export type ProductFormValues = z.infer<typeof productSchema>;
