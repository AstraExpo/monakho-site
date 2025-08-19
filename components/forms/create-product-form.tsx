"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Tag,
  Package,
  DollarSign,
  Layers,
  ShoppingCart,
  Image as ImageIcon,
  FileText,
  Music,
} from "lucide-react";
import { uploadFileViaApi } from "@/lib/server/uploadFile";

// 🔑 Firebase upload helpers

const PRODUCT_CATEGORIES = [
  "Apparel",
  "Books",
  "Music",
  "Accessories",
  "Digital",
  "Other",
];

export function CreateProductForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    status: "Active",
    isFeatured: false,
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [bookFile, setBookFile] = useState<File | null>(null);
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [digitalFile, setDigitalFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
      setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const isFormValid = useMemo(() => {
    if (
      !formData.name ||
      !formData.price ||
      !formData.stock ||
      !formData.category
    ) {
      return false;
    }

    // Require at least 1 image
    if (images.length === 0) return false;

    // Category-specific checks
    if (formData.category === "Books" && !bookFile) return false;
    if (formData.category === "Music" && !musicFile) return false;
    if (formData.category === "Digital" && !digitalFile) return false;

    return true;
  }, [formData, images, bookFile, musicFile, digitalFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ✅ Upload images via API route
      const imageUrls = await Promise.all(
        images.map((file) =>
          uploadFileViaApi(file, `products/${formData.category}/images`)
        )
      );
      // ✅ Upload category-specific files
      let pdfUrl: string | null = null;
      let audioUrl: string | null = null;
      let fileUrl: string | null = null;

      if (bookFile) {
        pdfUrl = await uploadFileViaApi(bookFile, "products/Books/pdfs");
      }

      if (musicFile) {
        audioUrl = await uploadFileViaApi(musicFile, "products/Music/audio");
      }

      if (digitalFile) {
        fileUrl = await uploadFileViaApi(digitalFile, "products/Digital/files");
      }

      // ✅ Final payload for DB (backend will now recognize it)
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: imageUrls,
        pdfUrl,
        audioUrl,
        fileUrl,
      };

      const res = await fetch("/api/product/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create product");

      alert("✅ Product created successfully!");
      onClose();
    } catch (err: any) {
      alert(`❌ ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Product Name */}
        <div className="col-span-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Product Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe the product..."
            rows={3}
          />
        </div>

        {/* Price */}
        <div>
          <Label htmlFor="price" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Price
          </Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            placeholder="e.g., 19.99"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <Label htmlFor="stock" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Stock
          </Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            placeholder="e.g., 100"
            required
          />
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category" className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Category
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Always show Images */}
        <div className="col-span-2">
          <Label htmlFor="images" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Upload Images
          </Label>
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          {previewUrls.length > 0 && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {previewUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Preview ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded-md border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Category-Specific Uploads */}
        {formData.category === "Books" && (
          <div className="col-span-2">
            <Label htmlFor="bookFile" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Upload Book File (PDF)
            </Label>
            <Input
              id="bookFile"
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, setBookFile)}
            />
          </div>
        )}

        {formData.category === "Music" && (
          <div className="col-span-2">
            <Label htmlFor="musicFile" className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              Upload Music File (MP3)
            </Label>
            <Input
              id="musicFile"
              type="file"
              accept="audio/*"
              onChange={(e) => handleFileChange(e, setMusicFile)}
            />
          </div>
        )}

        {formData.category === "Digital" && (
          <div className="col-span-2">
            <Label htmlFor="digitalFile" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Upload Digital File (ZIP/PDF/Other)
            </Label>
            <Input
              id="digitalFile"
              type="file"
              accept=".zip,.pdf,.rar,.7z,.docx,.pptx"
              onChange={(e) => handleFileChange(e, setDigitalFile)}
            />
          </div>
        )}
      </div>

      {/* Featured Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isFeatured"
          checked={formData.isFeatured}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isFeatured: checked as boolean })
          }
        />
        <Label htmlFor="isFeatured" className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" /> Mark as featured product
        </Label>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!isFormValid}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
        >
          Create Product
        </Button>
      </DialogFooter>
    </form>
  );
}