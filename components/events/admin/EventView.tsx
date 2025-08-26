import React from "react";
import Image from "next/image";
import { BaseEvent } from "@/lib/types/events";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export function EventView({
  event,
  open,
  onOpenChange,
}: {
  event: BaseEvent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-5xl m-auto p-0 sm:rounded-lg overflow-hidden bg-transparent">
        <DialogTitle>{event.title}</DialogTitle>
        {/* Full screen gradient background */}
        <div className="min-h-[80vh] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-4 sm:p-6 rounded-lg">
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Product Images */}
            <Card className="col-span-1 flex flex-col items-center justify-center bg-card/50 p-4 rounded-lg shadow-md relative">
              <div className="relative w-full h-64 md:h-80 flex items-center justify-center">
                <Image
                  src={event.posterUrl || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </Card>

            {/* Product Info */}
            <div className="col-span-2 flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{event.category}</Badge>
                <Badge variant="secondary">${event.isRecurring}</Badge>
              </div>

              <Card className="bg-card/50 p-4 rounded-lg shadow-inner">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground">Venue Type</p>
                    <p className="font-medium">{event.venueType}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time & Date</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Status</p>
                    <p className="font-medium">{event.status}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-card/50 p-4 rounded-lg shadow-inner">
                <p className="text-muted-foreground mb-1">Description</p>
                <p>{event.description || "-"}</p>
              </Card>

              <div className="mt-4 flex justify-end">
                <DialogClose asChild>
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    Close
                  </Button>
                </DialogClose>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
