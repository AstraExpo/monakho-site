"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { CreateEventForm } from "@/components/forms/create-event-form";
import EventStats from "@/components/events/admin/EventStats";
import EventSearchFilters from "@/components/events/admin/EventSearchFilters";
import EventsTable from "@/components/events/admin/EventsTable";
import { useEvents } from "../hooks/events";

export default function AdminEventsPage() {
  const { events, loading } = useEvents();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Filtering
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.venueName?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (event.venueUrl?.toLowerCase() || "").includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || event.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Event Management
          </h1>
          <p className="text-muted-foreground">
            Create and manage ministry events
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Event</DialogTitle>
              <DialogDescription className="text-gray-300">
                Fill in the details below to create a new ministry event.
              </DialogDescription>
            </DialogHeader>
            <CreateEventForm onClose={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <EventStats loading={loading} events={events} />

      {/* Search + Filter */}
      <EventSearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {/* Events Table */}
      <EventsTable events={filteredEvents} />
    </div>
  );
}
