"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { BaseProduct } from "@/lib/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function ProductView({
  product,
  open,
  onOpenChange,
}: {
  product: BaseProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const images =
    product.images && product.images.length
      ? product.images
      : ["/placeholder.svg"];

  const prevImage = () =>
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-5xl m-auto p-0 sm:rounded-lg overflow-hidden bg-transparent">
        <DialogTitle>{product.name}</DialogTitle>
        {/* Full screen gradient background */}
        <div className="min-h-[80vh] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-4 sm:p-6 rounded-lg">
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Product Images */}
            <Card className="col-span-1 flex flex-col items-center justify-center bg-card/50 p-4 rounded-lg shadow-md relative">
              <div className="relative w-full h-64 md:h-80 flex items-center justify-center">
                <Image
                  src={images[currentImage]}
                  alt={`${product.name} image ${currentImage + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary to-primary/70 p-2"
                      onClick={prevImage}
                    >
                      &#8592;
                    </Button>
                    <Button
                      variant="ghost"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-l from-primary to-primary/70 p-2"
                      onClick={nextImage}
                    >
                      &#8594;
                    </Button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-2">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-2 h-2 rounded-full ${
                        idx === currentImage
                          ? "bg-primary"
                          : "bg-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              )}
            </Card>

            {/* Product Info */}
            <div className="col-span-2 flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{product.category}</Badge>
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
                <Badge variant="secondary">${product.price}</Badge>
              </div>

              <Card className="bg-card/50 p-4 rounded-lg shadow-inner">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground">Stock</p>
                    <p className="font-medium">{product.stock}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sold</p>
                    <p className="font-medium">{product.sold}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Status</p>
                    <p className="font-medium">{product.status}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-card/50 p-4 rounded-lg shadow-inner">
                <p className="text-muted-foreground mb-1">Description</p>
                <p>{product.description || "-"}</p>
              </Card>

              <div className="mt-4 flex justify-end">
                <DialogClose asChild>
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    Close
                  </Button>
                </DialogClose>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
