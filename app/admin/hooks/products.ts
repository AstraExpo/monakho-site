import { BaseProduct, CreateProductInput, UpdateProductInput } from "@/lib/types/product";

export async function deleteProduct(id: string) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  const res = await fetch(`/api/updateproduct/${id}`, { method: "DELETE" });
  if (!res.ok) {
    alert("Failed to delete product");
  }
}

export async function updateProduct(id: string, productUpdate: UpdateProductInput) {
  const res = await fetch(`/api/updateproduct/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productUpdate),
  });
  if (!res.ok) {
    alert("Failed to update product");
  }
}

export async function getProduct(productId: string ): Promise<BaseProduct | null> {
    try {
        const res = await fetch(`/api/updateproduct/${productId}`, { method: "GET" });
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        return data as BaseProduct;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export async function createProduct(product: CreateProductInput) {
    try {
        const res = await fetch('/api/product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        if (!res.ok) throw new Error('Failed to create product');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error creating product:", error);
        alert("Failed to create product");
    }
}