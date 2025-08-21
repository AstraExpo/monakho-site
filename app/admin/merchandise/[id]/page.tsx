// app/admin/merchandise/[id]/page.tsx
import { notFound } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { BaseProduct } from "@/lib/types/product";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ProductStatusBadge } from "@/components/products/admin/ProductStatusBadge";
import { db } from "@/lib/server/firebase";

interface PageProps {
  params: { id: string };
}

export default async function ProductViewPage({ params }: PageProps) {
  const { id } = params;

  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) notFound();

  const product = docSnap.data() as BaseProduct;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <div className="flex gap-6">
        <div className="w-48 h-48 bg-muted rounded-lg overflow-hidden">
          <Image
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.name}
            width={192}
            height={192}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="space-y-2">
          <p><strong>Category:</strong> <Badge variant="outline">{product.category}</Badge></p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Sold:</strong> {product.sold}</p>
          <p><strong>Status:</strong> <ProductStatusBadge status={product.status} /></p>
          <p><strong>Description:</strong> {product.description || "-"}</p>
        </div>
      </div>
    </div>
  );
}
