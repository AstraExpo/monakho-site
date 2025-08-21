import { Badge } from "@/components/ui/badge";

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

export function ProductStatusBadge({ status }: { status: string }) {
  return <Badge className={getProductStatusColor(status)}>{status}</Badge>;
}
