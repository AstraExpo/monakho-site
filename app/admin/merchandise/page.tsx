"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, Edit, Trash2, Package, DollarSign, TrendingUp, Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/drop-down-menu"

export default function AdminMerchandisePage() {
  const products = [
    {
      id: 1,
      name: "Faith & Hope T-Shirt",
      category: "Apparel",
      price: 25.99,
      stock: 45,
      sold: 123,
      status: "Active",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Daily Devotional Book",
      category: "Books",
      price: 15.99,
      stock: 78,
      sold: 89,
      status: "Active",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Prayer Journal",
      category: "Stationery",
      price: 12.99,
      stock: 32,
      sold: 156,
      status: "Active",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Ministry Coffee Mug",
      category: "Accessories",
      price: 18.99,
      stock: 0,
      sold: 67,
      status: "Out of Stock",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      name: "Worship Music CD",
      category: "Media",
      price: 19.99,
      stock: 23,
      sold: 45,
      status: "Active",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      name: "Scripture Wall Art",
      category: "Decor",
      price: 35.99,
      stock: 15,
      sold: 28,
      status: "Low Stock",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "Out of Stock":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "Low Stock":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "Inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Merchandise Management
          </h1>
          <p className="text-muted-foreground">Manage ministry products and inventory</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
          <Plus className="w-4 h-4 mr-2" />
          New Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 new this month</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,456</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Sold</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">508</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Need restocking</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10 bg-card/50 backdrop-blur-sm border-border/50" />
        </div>
        <Button variant="outline" className="bg-card/50 backdrop-blur-sm border-border/50">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Products Table */}
      <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl">
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
            {products.map((product) => (
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
                  <span className={product.stock <= 20 ? "text-orange-500 font-medium" : ""}>{product.stock}</span>
                </TableCell>
                <TableCell>{product.sold}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
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
      </Card>
    </div>
  )
}
