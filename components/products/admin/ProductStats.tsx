// components/admin/products/ProductStats.tsx
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/Skeleton";
import { StatCard } from "@/components/StatsCard";
import { Calendar, Users, MapPin } from "lucide-react";

export function ProductStats({
  loading,
  totalProducts,
  totalSales,
  totalStock,
  categoriesCount,
}: {
  loading: boolean;
  totalProducts: number;
  totalSales: number;
  totalStock: number;
  categoriesCount: number;
}) {
  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4).fill(0).map((_, idx) => (
          <Card key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-4">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-16" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Products" value={totalProducts} icon={<Calendar />} note="+2 from last month" />
      <StatCard title="Total Sales" value={totalSales} icon={<Users />} note="+15% from last month" />
      <StatCard title="Total Stock" value={totalStock} icon={<MapPin />} note="Across all items" />
      <StatCard title="Categories Count" value={categoriesCount} icon={<MapPin />} note="Unique categories" />
    </div>
  );
}
