import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
} from "@/components/ui/table";
import React from "react";
import EventsRow from "./EventsRow";
import { BaseEvent } from "@/lib/types/events";

export default function EventsTable({ events }: { events: BaseEvent[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Venue</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Recurrence</TableHead>
          <TableHead>Attendees</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((e) => (
          <EventsRow key={e.id} event={e} />
        ))}
      </TableBody>
    </Table>
  );
}
