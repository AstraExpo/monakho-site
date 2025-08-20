import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BaseProduct } from "@/lib/types/product";

export function ProductCard({ product }: { product: BaseProduct }) {
  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="relative mb-6">
          <Image
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-2">{product.description}</p>
        <p className="text-gray-400 text-sm mb-2">{product.category}</p>
        <p className="text-gray-400 text-sm mb-2">{product.stock}</p>
        <p className="text-blue-400 font-semibold mb-4">${product.price}</p>

        <Button className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:opacity-90">
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
}
