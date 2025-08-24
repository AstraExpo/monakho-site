import { FieldValue } from "firebase-admin/firestore";

export type Category =
  | "Books"
  | "Music"
  | "Merch"
  | "Clothing"
  | "Accessories"
  | "Video"
  | "Other";

export type Status = "Active" | "Inactive" | "Out of Stock";

export interface ProductVariant {
  id: string;
  name: string;
  price?: number;
  stock?: number;
}

export interface ProductRating {
  userId: string;
  rating: number; // 1–5
  comment?: string;
  createdAt: FirebaseFirestore.Timestamp | FieldValue;
}

/**
 * 1. The full Product as stored/retrieved from the database
 */
export interface BaseProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: Category;
  price: number;
  stock: number;
  status: Status;
  images: string[];
  pdfUrl?: string | null;
  musicUrl?: string | null;
  videoUrl?: string | null;
  variants?: ProductVariant[];
  sold?: number;
  views?: number;
  ratings?: ProductRating[];
  averageRating?: number;
  createdAt: FirebaseFirestore.Timestamp | FieldValue;
  updatedAt: FirebaseFirestore.Timestamp | FieldValue;
  createdBy: string;
  updatedBy: string;
}

/**
 * 2. Data needed to create a new product
 *    (what your form will send to the backend)
 */
export type CreateProductInput = Omit<
  BaseProduct,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "createdBy"
  | "updatedBy"
  | "averageRating"
  | "sold"
  | "views"
  | "ratings"
>;

/**
 * 3. Data used to update an existing product
 *    (only partial updates allowed, so all fields optional)
 */
export type UpdateProductInput = Partial<CreateProductInput>;

/**
 * (Optional) If you want to keep your current form data alias
 *    you can reuse CreateProductInput here
 */
export type ProductFormData = CreateProductInput;
