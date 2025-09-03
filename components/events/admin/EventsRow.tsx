import { BaseEvent } from '@/lib/types/events'
import Image from 'next/image'
import React, { useState } from 'react'
import {EventView} from './EventView';
import { deleteEvent } from '@/app/admin/hooks/events';
import {EditEventDialog} from './EditEventDialog';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/drop-down-menu';
import { Badge, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import { EventStatusBadge } from './EventStatusBadge';

export default function EventsRow({event}: {event: BaseEvent}) {
      const [viewOpen, setViewOpen] = useState(false);
      const eventId = event.id;
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<BaseEvent | null>(null);
  return (
    <TableRow key={event.id} className="hover:bg-muted/40 transition-colors">
      {/* Product Image + Name */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden border border-border bg-muted">
            <Image
              width={48}
              height={48}
              src={event.posterUrl || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="font-medium text-foreground">{event.title}</div>
        </div>
      </TableCell>

      <TableCell>
        <Badge className="capitalize">
          {event.time}
        </Badge>
      </TableCell>

      <TableCell className="font-medium text-foreground">
        {event.venueType}
      </TableCell>

      {/* Stock */}
      <TableCell>
        {event.category}
      </TableCell>

      {/* Sold */}
      <TableCell className="text-foreground/80">{event.recurrenceType}</TableCell>

      {/* Status */}
      <TableCell>
        <EventStatusBadge status={event.status} />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setViewOpen(true)}
              className="gap-2"
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setEditingEvent(event);
                setIsEditDialogOpen(true)}}
              className="gap-2"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-destructive focus:text-destructive gap-2"
              onClick={() => {deleteEvent(eventId)}}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Modals */}
        <EventView
          onOpenChange={setViewOpen}
          event={event}
          open={viewOpen}
        />
        <EditEventDialog
            isEditDialogOpen={isEditDialogOpen}
            setIsEditDialogOpen={setIsEditDialogOpen}
            editingEvent={editingEvent}
                    />
      </TableCell>
    </TableRow>  
)
}
