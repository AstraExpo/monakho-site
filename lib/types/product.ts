export type Category =
  | "Books"
  | "Music"
  | "Merch"
  | "Clothing"
  | "Accessories"
  | "Video"
  | "Other";

export type Status = "Active" | "Inactive" | "Out of Stock";

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
  variants: any[]; // TODO: define properly if you support sizes/colors
  sold: number;
  views: number;
  ratings: any[]; // TODO: define rating type
  averageRating: number;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  createdBy: string;
  updatedBy: string;
}
