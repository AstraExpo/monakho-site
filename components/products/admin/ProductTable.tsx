// components/admin/products/ProductTable.tsx
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductRow } from "./ProductRow";
import { BaseProduct } from "@/lib/types/product";

export function ProductTable({ products }: { products: BaseProduct[] }) {
  return (
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
        {products.map((p) => <ProductRow key={p.id} product={p} />)}
      </TableBody>
    </Table>
  );
}
