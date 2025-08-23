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
import { useToast } from "@/components/ui/ToastContext";
import ProductView from "./ProductView";
import { useState } from "react";
import { EditProductDialog } from "./EditProductDialog";
import { getErrorMessage } from "@/utils/error";

export function ProductRow({ product }: { product: BaseProduct }) {
  const [viewOpen, setViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
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
    } catch (err: unknown) {
      console.error(err);
      showToast(getErrorMessage(err), "error");
    }
  };

  return (
    <TableRow key={product.id} className="hover:bg-muted/40 transition-colors">
      {/* Product Image + Name */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden border border-border bg-muted">
            <Image
              width={48}
              height={48}
              src={product.images?.[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="font-medium text-foreground">{product.name}</div>
        </div>
      </TableCell>

      {/* Category */}
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {product.category}
        </Badge>
      </TableCell>

      {/* Price */}
      <TableCell className="font-medium text-foreground">
        ${product.price.toFixed(2)}
      </TableCell>

      {/* Stock */}
      <TableCell
        className={
          product.stock <= 20
            ? "text-orange-500 font-semibold"
            : "text-foreground"
        }
      >
        {product.stock}
      </TableCell>

      {/* Sold */}
      <TableCell className="text-foreground/80">{product.sold}</TableCell>

      {/* Status */}
      <TableCell>
        <ProductStatusBadge status={product.status} />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setViewOpen(true)}
              className="gap-2"
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setIsEditOpen(true)}
              className="gap-2"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-destructive focus:text-destructive gap-2"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Modals */}
        <ProductView
          onOpenChange={setViewOpen}
          product={product}
          open={viewOpen}
        />
        <EditProductDialog
          product={product}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onUpdate={() => {}}
        />
      </TableCell>
    </TableRow>
  );
}
