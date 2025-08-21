// components/admin/products/ProductRow.tsx
"use client";

import { TableRow, TableCell } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/drop-down-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { ProductStatusBadge } from "./ProductStatusBadge";
import Image from "next/image";
import { BaseProduct } from "@/lib/types/product";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastContext";
import ProductView from "./ProductView";
import { useState } from "react";
import { EditProductDialog } from "./EditProductDialog";

export function ProductRow({ product }: { product: BaseProduct }) {
  const [viewOpen, setViewOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleDelete = async () => {
    const confirmed = confirm(
      `Are you sure you want to delete ${product.name}?`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/product/${product.id}/delete`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed request");
      showToast("Product deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete product", "error");
    }
  };

  return (
    <TableRow key={product.id}>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
            <Image
              width={48}
              height={48}
              src={product.images?.[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="font-medium">{product.name}</div>
        </div>
      </TableCell>

      <TableCell>
        <Badge variant="outline">{product.category}</Badge>
      </TableCell>

      <TableCell>${product.price}</TableCell>

      <TableCell
        className={product.stock <= 20 ? "text-orange-500 font-medium" : ""}
      >
        {product.stock}
      </TableCell>

      <TableCell>{product.sold}</TableCell>

      <TableCell>
        <ProductStatusBadge status={product.status} />
      </TableCell>

      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setViewOpen(true)} // open the dialog on click
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ProductView
          onOpenChange={setViewOpen}
          product={product}
          open={viewOpen}
        />
                <EditProductDialog
          product={product}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onUpdate={updatedProduct => {
            // Update local state or refetch
          }}
        />
      </TableCell>
    </TableRow>
  );
}
