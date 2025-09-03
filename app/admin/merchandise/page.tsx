"use client";

import { useEffect, useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateProductForm } from "@/components/forms/create-product-form";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/server/firebase";
import { productConverter } from "@/lib/server/converters";
import { BaseProduct } from "@/lib/types/product";
import { useDebouncedValue } from "@/utils/debaunce";
import { LoadingTable } from "@/components/LoadingTable";
import { ProductStats } from "@/components/products/admin/ProductStats";
import { ProductSearchFilter } from "@/components/products/admin/ProductSearchFilter";
import { ProductTable } from "@/components/products/admin/ProductTable";

export default function AdminMerchandisePage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<BaseProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const debouncedSearch = useDebouncedValue(searchQuery, 3000);

  // Firestore Listener
  useEffect(() => {
    const q = query(
      collection(db, "products").withConverter(productConverter),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map((doc) => doc.data());
      setProducts(productsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Derived Data
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.category?.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesStatus =
        filterStatus === "All" || product.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [products, debouncedSearch, filterStatus]);

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalSales = products.reduce((sum, p) => sum + (p.sold || 0), 0);
  const categoriesCount = new Set(products.map((p) => p.category)).size;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Product Management
          </h1>
          <p className="text-muted-foreground">
            Manage ministry products and inventory
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              <Plus className="w-4 h-4 mr-2" />
              New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">
                Create New Product
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Fill in the details below to add a product
              </DialogDescription>
            </DialogHeader>
            <CreateProductForm onClose={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <ProductStats
        loading={loading}
        totalProducts={totalProducts}
        totalSales={totalSales}
        totalStock={totalStock}
        categoriesCount={categoriesCount}
      />

      {/* Search & Filter */}
      <ProductSearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {/* Products Table */}
      <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl">
        {loading ? (
          <LoadingTable />
        ) : (
          <ProductTable products={filteredProducts} />
        )}
      </Card>
    </div>
  );
}
