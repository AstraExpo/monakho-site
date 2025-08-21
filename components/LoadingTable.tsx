import { Skeleton } from "./ui/Skeleton";

export function LoadingTable() {
  return (
    <div className="p-6 space-y-4">
      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <div key={idx} className="flex justify-between items-center gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
    </div>
  );
}
