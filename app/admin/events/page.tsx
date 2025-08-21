"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Calendar,
  Users,
  MapPin,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/drop-down-menu";
import { CreateEventForm } from "@/components/forms/create-event-form";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/Skeleton";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/server/firebase";
import { Textarea } from "@/components/ui/textarea";
import { deleteEvent, updateEvent } from "../hooks/events";
import { BaseEvent, CATEGORIES, EventDocument, mapEventDoc } from "@/lib/types/events";
import { LoadingTable } from "@/components/LoadingTable";
import { StatCard } from "@/components/StatsCard";

export default function AdminEventsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [events, setEvents] = useState<BaseEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<BaseEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Subscribe to events collection
  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData: BaseEvent[] = snapshot.docs.map((doc) =>
        mapEventDoc(doc.id, doc.data() as EventDocument)
      );
      setEvents(eventsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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

  // Stats
  const totalEvents = events.length;
  const thisMonthEvents = events.filter((e) => {
    const eventDate = new Date(e.date);
    const now = new Date();
    return (
      eventDate.getMonth() === now.getMonth() &&
      eventDate.getFullYear() === now.getFullYear()
    );
  }).length;
  const totalAttendees = events.reduce((sum, e) => sum + (e.attendees || 0), 0);
  const locationsCount = new Set(
    events.map((e) => (e.venueType === "Physical" ? e.venueName : e.venueUrl))
  ).size;

  const getStatusColor = (status: string) => {
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
  };

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
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array(4)
            .fill(0)
            .map((_, idx) => (
              <Card
                key={idx}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-4"
              >
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16" />
              </Card>
            ))
        ) : (
          <>
            <StatCard
              title="Total Events"
              value={totalEvents}
              icon={<Calendar />}
              note="+2 from last month"
            />
            <StatCard
              title="This Month"
              value={thisMonthEvents}
              icon={<Calendar />}
              note="Scheduled events"
            />
            <StatCard
              title="Total Attendees"
              value={totalAttendees}
              icon={<Users />}
              note="+15% from last month"
            />
            <StatCard
              title="Locations"
              value={locationsCount}
              icon={<MapPin />}
              note="Active venues"
            />
          </>
        )}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <Filter className="w-4 h-4 mr-2" />
              {filterStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["All", "Published", "Draft", "Scheduled"].map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Events Table */}
      <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20">
        {loading ? (
          <LoadingTable />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Event</TableHead>
                <TableHead className="text-white">Date & Time</TableHead>
                <TableHead className="text-white">Venue</TableHead>
                <TableHead className="text-white">Category</TableHead>
                <TableHead className="text-white">Recurrence</TableHead>
                <TableHead className="text-white">Attendees</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium text-white">
                    {event.title}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-white">
                      <div>{new Date(event.date).toLocaleDateString()}</div>
                      <div className="text-gray-300">{event.time || "N/A"}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    {event.venueType === "Physical"
                      ? event.venueName || "N/A"
                      : event.venueUrl || "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-white border-white/20"
                    >
                      {event.category || "Uncategorized"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white">
                    {event.isRecurring && event.recurrenceEndDate
                      ? `${event.recurrenceType} until ${new Date(
                          event.recurrenceEndDate
                        ).toLocaleDateString()}`
                      : "One-time"}
                  </TableCell>
                  <TableCell className="text-white">
                    {event.attendees ?? 0}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status || "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 text-white hover:bg-white/10"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-white/10 backdrop-blur-md border-white/20"
                      >
                        <DropdownMenuItem
                          className="text-white hover:bg-white/20"
                          onClick={() => {
                            setEditingEvent(event);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive hover:bg-white/20"
                          onClick={() => deleteEvent(event.id)}
                        >
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
        )}
      </Card>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl bg-white/10 backdrop-blur-md border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Event</DialogTitle>
            <DialogDescription className="text-gray-300">
              Update the details for this event.
            </DialogDescription>
          </DialogHeader>

          {editingEvent && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const updates = Object.fromEntries(formData.entries());
                await updateEvent(editingEvent.id, updates);
                setIsEditDialogOpen(false);
              }}
              className="space-y-4"
            >
              {/* Title */}
              <Input
                name="title"
                defaultValue={editingEvent.title}
                placeholder="Event title"
                className="bg-white/10 border-white/20 text-white"
                required
              />

              {/* Description */}
              <Textarea
                name="description"
                defaultValue={editingEvent.description}
                placeholder="Event description"
                className="bg-white/10 border-white/20 text-white"
              />

              {/* Date */}
              <Input
                type="date"
                name="date"
                defaultValue={editingEvent.date}
                className="bg-white/10 border-white/20 text-white"
                required
              />

              {/* Time */}
              <Input
                type="time"
                name="time"
                defaultValue={editingEvent.time}
                className="bg-white/10 border-white/20 text-white"
                required
              />

              {/* Venue Type */}
              <select
                name="venueType"
                defaultValue={editingEvent.venueType}
                className="bg-white/10 border-white/20 text-white p-2 rounded"
              >
                <option value="Physical">Physical</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
              </select>

              {editingEvent.venueType === "Physical" && (
                <Input
                  name="venueName"
                  defaultValue={editingEvent.venueName || ""}
                  placeholder="Venue name"
                  className="bg-white/10 border-white/20 text-white"
                />
              )}
              {editingEvent.venueType === "Online" && (
                <Input
                  name="venueUrl"
                  defaultValue={editingEvent.venueUrl || ""}
                  placeholder="Online event link"
                  className="bg-white/10 border-white/20 text-white"
                />
              )}

              {/* Category */}
              <select
                name="category"
                defaultValue={editingEvent.category}
                className="bg-white/10 border-white/20 text-white p-2 rounded"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Attendees */}
              <Input
                type="number"
                name="attendees"
                defaultValue={editingEvent.attendees || 0}
                placeholder="Current attendees"
                className="bg-white/10 border-white/20 text-white"
              />

              {/* Max Attendees */}
              <Input
                type="number"
                name="maxAttendees"
                defaultValue={editingEvent.maxAttendees || ""}
                placeholder="Leave empty for unlimited"
                className="bg-white/10 border-white/20 text-white"
              />

              {/* Status */}
              <select
                name="status"
                defaultValue={editingEvent.status || "Draft"}
                className="bg-white/10 border-white/20 text-white p-2 rounded"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Scheduled">Scheduled</option>
              </select>

              {/* Is Public */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isPublic"
                  defaultChecked={editingEvent.isPublic}
                  className="accent-primary"
                />
                <label className="text-white">Make event public</label>
              </div>

              {/* Recurrence */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isRecurring"
                  defaultChecked={editingEvent.isRecurring}
                  className="accent-primary"
                />
                <label className="text-white">Recurring event</label>
              </div>

              {editingEvent.isRecurring && (
                <>
                  <select
                    name="recurrenceType"
                    defaultValue={editingEvent.recurrenceType || "Weekly"}
                    className="bg-white/10 border-white/20 text-white p-2 rounded"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                  <Input
                    type="date"
                    name="recurrenceEndDate"
                    defaultValue={editingEvent.recurrenceEndDate ?? ""}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </>
              )}

              <Button type="submit" className="bg-primary">
                Save Changes
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}