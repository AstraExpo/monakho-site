import { ApiResponse } from "@/lib/types/api";
import {
  BaseProduct,
  CreateProductInput,
  UpdateProductInput,
} from "@/lib/types/product";

// DELETE a product
export async function deleteProduct(
  id: string
): Promise<ApiResponse<{ id: string }> | null> {
  try {
    if (!confirm("Are you sure you want to delete this product?")) return null;

    const res = await fetch(`/api/updateproduct/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete product");

    return (await res.json()) as ApiResponse<{ id: string }>;
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Failed to delete product");
    return null;
  }
}

// UPDATE a product
export async function updateProduct(
  id: string,
  productUpdate: UpdateProductInput
): Promise<ApiResponse<BaseProduct> | null> {
  try {
    const res = await fetch(`/api/updateproduct/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productUpdate),
    });
    if (!res.ok) throw new Error("Failed to update product");

    return (await res.json()) as ApiResponse<BaseProduct>;
  } catch (error) {
    console.error("Error updating product:", error);
    alert("Failed to update product");
    return null;
  }
}

// GET a product
export async function getProduct(
  productId: string
): Promise<ApiResponse<BaseProduct> | null> {
  try {
    const res = await fetch(`/api/updateproduct/${productId}`, {
      method: "GET",
    });
    if (!res.ok) throw new Error("Failed to fetch product");

    return (await res.json()) as ApiResponse<BaseProduct>;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// CREATE a product
export async function createProduct(
  product: CreateProductInput
): Promise<ApiResponse<BaseProduct> | null> {
  try {
    const res = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Failed to create product");

    return (await res.json()) as ApiResponse<BaseProduct>;
  } catch (error) {
    console.error("Error creating product:", error);
    alert("Failed to create product");
    return null;
  }
}
