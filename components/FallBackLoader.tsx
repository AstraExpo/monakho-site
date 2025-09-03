import { Loader2 } from "lucide-react";

export function FallbackLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6 animate-pulse">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />

      <div className="space-y-3 w-48">
        <div className="h-4 bg-blue-400/30 rounded-md"></div>
        <div className="h-4 bg-purple-400/30 rounded-md"></div>
        <div className="h-4 bg-pink-400/30 rounded-md"></div>
      </div>

      <p className="text-sm text-muted-foreground">Please wait, loading...</p>
    </div>
  );
}
