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
import type { Category, ProductFormData, Status } from "@/lib/types/product";
import Image from "next/image";
import { getErrorMessage } from "@/utils/error";
import { useToast } from "../ui/ToastContext";
import { createProduct } from "@/app/admin/hooks/products";
import { CATEGORIES, STATUS } from "@/lib/types/product";

export function CreateProductForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "" as Category,
    status: "" as Status,
    isFeatured: false,
    images: [],
    pdfUrl: "",
    musicUrl: "",
    videoUrl: "",
    slug: "",
    variants: [],
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Category-specific files
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const { showToast } = useToast();

  // --- Handlers
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
    if (images.length === 0) return false;

    // category-specific validation
    if (formData.category === "Books" && !bookFile) return false;
    if (formData.category === "Music" && !musicFile) return false;
    if (formData.category === "Video" && !videoFile) return false;

    return true;
  }, [formData, images, bookFile, musicFile, videoFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // --- Upload images
      const imageUrls = await Promise.all(
        images.map((file) =>
          uploadFileViaApi(file, `products/${formData.category}/images`)
        )
      );

      // --- Upload category-specific files
      let pdfUrl: string | null = null;
      let musicUrl: string | null = null;
      let videoUrl: string | null = null;

      if (bookFile) {
        pdfUrl = await uploadFileViaApi(bookFile, "products/Books/pdfs");
      }
      if (musicFile) {
        musicUrl = await uploadFileViaApi(musicFile, "products/Music/audio");
      }
      if (videoFile) {
        videoUrl = await uploadFileViaApi(videoFile, "products/Video/files");
      }

      // --- Final payload
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: imageUrls,
        pdfUrl,
        musicUrl,
        videoUrl,
      };

      const data = await createProduct(payload);
      console.log("Created product:", data);

      if (!data) throw new Error("Failed to create product"); // data is null if error

      showToast("✅ Product created successfully!", "success");
      onClose();
    } catch (err: unknown) {
      showToast(getErrorMessage(err), "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        {/* Name */}
        <div className="col-span-2 space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <Tag className="w-4 h-4" /> Product Name
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
        <div className="col-span-2 space-y-2">
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
        <div className="space-y-2">
          <Label htmlFor="price" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Price
          </Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            placeholder="e.g., 19.99"
            required
          />
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <Label htmlFor="stock" className="flex items-center gap-2">
            <Package className="w-4 h-4" /> Stock
          </Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: Number(e.target.value) })
            }
            placeholder="e.g., 100"
            required
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category" className="flex items-center gap-2">
            <Layers className="w-4 h-4" /> Category
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value as Category })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value as Status })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Images */}
        <div className="col-span-2 space-y-2">
          <Label htmlFor="images" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> Upload Images
          </Label>
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          {previewUrls.length > 0 && (
            <div className="mt-3 flex gap-3 flex-wrap">
              {previewUrls.map((url, idx) => (
                <Image
                  width={96}
                  height={96}
                  key={idx}
                  src={url}
                  alt={`Preview ${idx + 1}`}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Category-specific uploads */}
        {formData.category === "Books" && (
          <div className="col-span-2 space-y-2">
            <Label htmlFor="bookFile" className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> Upload Book File (PDF)
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
          <div className="col-span-2 space-y-2">
            <Label htmlFor="musicFile" className="flex items-center gap-2">
              <Music className="w-4 h-4" /> Upload Music File (MP3)
            </Label>
            <Input
              id="musicFile"
              type="file"
              accept="audio/*"
              onChange={(e) => handleFileChange(e, setMusicFile)}
            />
          </div>
        )}

        {formData.category === "Video" && (
          <div className="col-span-2 space-y-2">
            <Label htmlFor="videoFile" className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> Upload Video File (MP4)
            </Label>
            <Input
              id="videoFile"
              type="file"
              accept="video/*"
              onChange={(e) => handleFileChange(e, setVideoFile)}
            />
          </div>
        )}
      </div>

      {/* Featured */}
      <div className="flex items-center space-x-3">
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

      {/* Actions */}
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isFormValid}>
          Create Product
        </Button>
      </DialogFooter>
    </form>
  );
}
