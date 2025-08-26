import { Badge } from "@/components/ui/badge";

function getEventStatusColor(status: string) {
  switch (status) {
    case "Published":
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    case "Draft":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "Scheduled":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
}

export function EventStatusBadge({ status }: { status: string }) {
  return <Badge className={getEventStatusColor(status)}>{status}</Badge>;
}
