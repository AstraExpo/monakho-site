"use client";

import type React from "react";

import { useState } from "react";
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
import { Package, DollarSign, Hash, Tag, ImageIcon } from "lucide-react";

export function CreateMerchandiseForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    costPrice: "",
    sku: "",
    stock: "",
    weight: "",
    dimensions: "",
    imageUrl: "",
    tags: "",
    isActive: true,
    isFeatured: false,
    trackInventory: true,
    allowBackorders: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating merchandise:", formData);
    // Here you would typically send the data to your API
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Product Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter product name"
            required
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div>
          <Label htmlFor="category" className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Category
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apparel">Apparel</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="media">Media</SelectItem>
              <SelectItem value="stationery">Stationery</SelectItem>
              <SelectItem value="decor">Home Decor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="sku" className="flex items-center gap-2">
            <Hash className="w-4 h-4" />
            SKU
          </Label>
          <Input
            id="sku"
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            placeholder="Product SKU"
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div>
          <Label htmlFor="price" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Selling Price
          </Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            placeholder="0.00"
            required
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div>
          <Label htmlFor="costPrice">Cost Price</Label>
          <Input
            id="costPrice"
            type="number"
            step="0.01"
            value={formData.costPrice}
            onChange={(e) =>
              setFormData({ ...formData, costPrice: e.target.value })
            }
            placeholder="0.00"
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div>
          <Label htmlFor="stock">Stock Quantity</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            placeholder="0"
            required
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div>
          <Label htmlFor="weight">Weight (lbs)</Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            value={formData.weight}
            onChange={(e) =>
              setFormData({ ...formData, weight: e.target.value })
            }
            placeholder="0.0"
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="dimensions">Dimensions (L x W x H)</Label>
          <Input
            id="dimensions"
            value={formData.dimensions}
            onChange={(e) =>
              setFormData({ ...formData, dimensions: e.target.value })
            }
            placeholder="10 x 8 x 2 inches"
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="imageUrl" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Image URL
          </Label>
          <Input
            id="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            placeholder="https://example.com/image.jpg"
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe your product..."
            rows={3}
            required
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="faith, gift, inspirational"
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="active"
            checked={formData.isActive}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isActive: checked as boolean })
            }
          />
          <Label htmlFor="active">Product is active</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={formData.isFeatured}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isFeatured: checked as boolean })
            }
          />
          <Label htmlFor="featured">Feature this product</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="trackInventory"
            checked={formData.trackInventory}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, trackInventory: checked as boolean })
            }
          />
          <Label htmlFor="trackInventory">Track inventory</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="backorders"
            checked={formData.allowBackorders}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, allowBackorders: checked as boolean })
            }
          />
          <Label htmlFor="backorders">Allow backorders</Label>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          Create Product
        </Button>
      </DialogFooter>
    </form>
  );
}
