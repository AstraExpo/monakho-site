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
  thumbnail: string | null;
  pdfUrl: string | null;
  musicUrl: string | null;
  videoUrl: string | null;
  variants: ProductVariant[];   
  sold: number;
  views: number;
  ratings: ProductRating[]; 
  averageRating: number;
  createdAt: FirebaseFirestore.Timestamp | FieldValue;
  updatedAt: FirebaseFirestore.Timestamp | FieldValue;
  createdBy: string;
  updatedBy: string;
}