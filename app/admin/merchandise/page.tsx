"use client";

import { useEffect, useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Calendar,
  Users,
  MapPin,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/drop-down-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateProductForm } from "@/components/forms/create-product-form";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/server/firebase";
import { LoadingTable, StatCard } from "../events/page";
import { Skeleton } from "@/components/ui/Skeleton";

// ------------------ Utility ------------------

/**
 * Map product status to corresponding badge colors
 */
function getProductStatusColor(status: string) {
  switch (status) {
    case "Active":
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    case "Out of Stock":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "Low Stock":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "Inactive":
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
}

/**
 * Small debounce hook to prevent search lag
 */
function useDebouncedValue<T>(value: T, delay = 3000): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

// ------------------ Main Page ------------------

export default function AdminMerchandisePage() {
  // UI states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data states
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Debounced search to optimize performance
  const debouncedSearch = useDebouncedValue(searchQuery, 300);

  // ------------------ Firestore Listener ------------------
  useEffect(() => {
    // Create a query to fetch products sorted by creation date
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));

    // Listen for real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  // ------------------ Derived Data ------------------

  // Filtered products memoized for performance
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        (product.venueName?.toLowerCase() || "").includes(
          debouncedSearch.toLowerCase()
        ) ||
        (product.venueUrl?.toLowerCase() || "").includes(
          debouncedSearch.toLowerCase()
        );

      const matchesStatus =
        filterStatus === "All" || product.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [products, debouncedSearch, filterStatus]);

  console.log("Filtered Products:", filteredProducts);

  // Stats
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalSales = products.reduce((sum, p) => sum + (p.sales || 0), 0);
  const categoriesCount = new Set(products.map((p) => p.category)).size;

  // ------------------ Render ------------------
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Merchandise Management
          </h1>
          <p className="text-muted-foreground">
            Manage ministry products and inventory
          </p>
        </div>

        {/* New Product Dialog */}
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

      {/* Stats Section */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array(4)
            .fill(0)
            .map((_, idx) => (
              <Card
                key={idx}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-4"
              >
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16" />
              </Card>
            ))
        ) : (
          <>
            <StatCard
              title="Total Products"
              value={totalProducts}
              icon={<Calendar />}
              note="+2 from last month"
            />
            <StatCard
              title="Total Sales"
              value={totalSales}
              icon={<Users />}
              note="+15% from last month"
            />
            <StatCard
              title="Total Stock"
              value={totalStock}
              icon={<MapPin />}
              note="Across all items"
            />
            <StatCard
              title="Categories Count"
              value={categoriesCount}
              icon={<MapPin />}
              note="Unique categories"
            />
          </>
        )}
      </div>

      {/* Search + Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/50 backdrop-blur-sm border-border/50"
          />
        </div>
        <Button
          variant="outline"
          className="bg-card/50 backdrop-blur-sm border-border/50"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Products Table */}
      <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl">
        {loading ? (
          <LoadingTable />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Sold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  {/* Product Info */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={product.images || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="font-medium">{product.name}</div>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>

                  {/* Price */}
                  <TableCell>${product.price}</TableCell>

                  {/* Stock */}
                  <TableCell>
                    <span
                      className={
                        product.stock <= 20 ? "text-orange-500 font-medium" : ""
                      }
                    >
                      {product.stock}
                    </span>
                  </TableCell>

                  {/* Sold */}
                  <TableCell>{product.sold}</TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge className={getProductStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
