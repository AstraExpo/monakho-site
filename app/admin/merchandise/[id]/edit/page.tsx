// app/admin/merchandise/[id]/edit/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BaseProduct } from "@/lib/types/product";
import { useToast } from "@/components/ui/ToastContext";

interface EditProductProps {
  params: { id: string };
  searchParams?: any;
}

export default function ProductEditPage({ params }: EditProductProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { id } = params;

  // For simplicity, fetch product client-side (can also fetch server-side)
  const [product, setProduct] = useState<BaseProduct | null>(null);
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");

  // Fetch product on mount
  useState(() => {
    fetch(`/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
        setName(data.product.name);
        setPrice(data.product.price);
        setStock(data.product.stock);
        setDescription(data.product.description || "");
      });
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/product/${id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, stock, description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update product");

      showToast("Product updated successfully", "success");
      router.push("/admin/merchandise");
    } catch (err) {
      console.error(err);
      showToast("Failed to update product", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-bold">Edit {product.name}</h1>

      <Input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      <Input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
      />

      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Product"}
      </Button>
    </form>
  );
}
