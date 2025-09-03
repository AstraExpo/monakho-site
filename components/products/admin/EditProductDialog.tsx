"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Category,
  ProductFormData,
  Status,
} from "@/lib/types/product";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateProduct } from "@/app/admin/hooks/products";

export function EditProductDialog({
  product,
  open,
  onOpenChange,
  productId
}: {
  product: ProductFormData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
}) {

  const [formData, setFormData] = useState<ProductFormData>({
    name: product.name,
    slug: product.slug,
    description: product.description,
    category: product.category,
    price: product.price,
    stock: product.stock,
    status: product.status,
    images: product.images,
    pdfUrl: product.pdfUrl,
    musicUrl: product.musicUrl,
    videoUrl: product.videoUrl,
    variants: product.variants,
  });

  function handleChange<K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

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
                    onChange={(e) =>
                      handleChange("category", e.target.value as Category)
                    }
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

                {/* Slug */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="slug" className="text-white/80">
                    Slug
                  </Label>
                  <Input
                    id="slug"
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleChange("slug", e.target.value)}
                    placeholder="enter-product-slug"
                  />
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="status" className="text-white/80">
                    Status
                  </Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                      handleChange("status", e.target.value as Status)
                    }
                    className="bg-slate-800 text-white rounded p-2"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Media URLs */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="pdfUrl" className="text-white/80">
                    PDF URL
                  </Label>
                  <Input
                    id="pdfUrl"
                    type="url"
                    value={formData.pdfUrl ?? ""}
                    onChange={(e) => handleChange("pdfUrl", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="musicUrl" className="text-white/80">
                    Music URL
                  </Label>
                  <Input
                    id="musicUrl"
                    type="url"
                    value={formData.musicUrl ?? ""}
                    onChange={(e) => handleChange("musicUrl", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="videoUrl" className="text-white/80">
                    Video URL
                  </Label>
                  <Input
                    id="videoUrl"
                    type="url"
                    value={formData.videoUrl ?? ""}
                    onChange={(e) => handleChange("videoUrl", e.target.value)}
                  />
                </div>

                {/* Images (array) */}
                <div className="flex flex-col gap-1">
                  <Label className="text-white/80">
                    Images (comma separated)
                  </Label>
                  <Input
                    type="text"
                    value={formData.images.join(", ")}
                    onChange={(e) =>
                      handleChange(
                        "images",
                        e.target.value.split(",").map((s) => s.trim())
                      )
                    }
                    placeholder="https://img1.jpg, https://img2.jpg"
                  />
                </div>

                {/* Variants (TODO: complex UI) */}
                <div className="flex flex-col gap-1">
                  <Label className="text-white/80">Variants</Label>
                  <Textarea
                    value={JSON.stringify(formData.variants, null, 2)}
                    onChange={(e) => {
                      try {
                        handleChange("variants", JSON.parse(e.target.value));
                      } catch {
                        // ignore invalid JSON
                      }
                    }}
                    className="font-mono text-xs bg-slate-800 text-white"
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
                  onClick={() => updateProduct(productId, formData)}
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
