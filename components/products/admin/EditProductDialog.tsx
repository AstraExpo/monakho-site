"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BaseProduct } from "@/lib/types/product";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/ToastContext";

export function EditProductDialog({
  product,
  open,
  onOpenChange,
  onUpdate,
}: {
  product: BaseProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (updatedProduct: BaseProduct) => void;
}) {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,
    category: product.category,
    description: product.description || "",
    status: product.status,
  });

  const handleChange = (
    field: keyof typeof formData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/product/${product.id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update product");

      onUpdate(data);

      onOpenChange(false);

      showToast("Product updated successfully", "success");
    } catch (err) {
      console.error(err);

      showToast("Failed to update product", "error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-5xl m-auto p-0 sm:rounded-lg overflow-hidden bg-transparent">
        <DialogTitle className="sr-only">Edit Product</DialogTitle>

        <div className="min-h-[80vh] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-4 sm:p-6 rounded-lg">
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-3 flex flex-col gap-4 bg-card/50 p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="name" className="text-white/80">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter product name"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="price" className="text-white/80">
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange("price", +e.target.value)}
                    placeholder="Enter price"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="stock" className="text-white/80">
                    Stock
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleChange("stock", +e.target.value)}
                    placeholder="Enter stock quantity"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="category" className="text-white/80">
                    Category
                  </Label>
                  <Input
                    id="category"
                    type="text"
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    placeholder="Enter category"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <Label htmlFor="description" className="text-white/80">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    placeholder="Enter product description"
                    className="min-h-[100px] md:min-h-[140px]"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row justify-end gap-3">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="text-white border-white/40 hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  Save
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
