"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Package,
  DollarSign,
  TrendingUp,
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

export default function AdminMerchandisePage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.venueName?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (product.venueUrl?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      );

    const matchesStatus =
      filterStatus === "All" || product.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Stats for Products
  const totalProducts = products.length;

  // const thisMonthProducts = products.filter((p) => {
  //   const productDate = new Date(p.date.seconds * 1000);
  //   const now = new Date();
  //   return (
  //     productDate.getMonth() === now.getMonth() &&
  //     productDate.getFullYear() === now.getFullYear()
  //   );
  // }).length;

  // Example: total stock (sum of all product quantities)
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

  // Example: total sales (if you’re tracking sales per product)
  const totalSales = products.reduce((sum, p) => sum + (p.sales || 0), 0);

  // Example: number of unique categories
  const categoriesCount = new Set(products.map((p) => p.category)).size;

  // Product status color mapping
  const getProductStatusColor = (status: string) => {
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
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Merchandise Management
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
              <DialogTitle className="text-white">Create New Event</DialogTitle>
              <DialogDescription className="text-gray-300">
                Fill in the details below to add a product
              </DialogDescription>
            </DialogHeader>
            <CreateProductForm onClose={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
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
            {/* <StatCard
              title="This Month"
              value={thisMonthProducts}
              icon={<Calendar />}
              note="Scheduled events"
            /> */}
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
              note="Active venues"
            />
            <StatCard
              title="Categories Count"
              value={categoriesCount}
              icon={<MapPin />}
              note="Active venues"
            />
          </>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
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
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <span
                      className={
                        product.stock <= 20 ? "text-orange-500 font-medium" : ""
                      }
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>{product.sold}</TableCell>
                  <TableCell>
                    <Badge className={getProductStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
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
