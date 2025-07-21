"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Table,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/drop-down-menu";
import { CreateEventForm } from "@/components/forms/create-event-form";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function AdminEventsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const events = [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "2024-01-21",
      time: "10:00 AM",
      location: "Main Sanctuary",
      category: "Worship",
      attendees: 150,
      status: "Published",
    },
    {
      id: 2,
      title: "Youth Bible Study",
      date: "2024-01-24",
      time: "7:00 PM",
      location: "Youth Center",
      category: "Study",
      attendees: 45,
      status: "Published",
    },
    {
      id: 3,
      title: "Community Outreach",
      date: "2024-01-27",
      time: "2:00 PM",
      location: "Downtown Shelter",
      category: "Service",
      attendees: 30,
      status: "Draft",
    },
    {
      id: 4,
      title: "Prayer & Meditation",
      date: "2024-01-30",
      time: "6:30 PM",
      location: "Prayer Garden",
      category: "Prayer",
      attendees: 25,
      status: "Published",
    },
    {
      id: 5,
      title: "Family Fun Day",
      date: "2024-02-03",
      time: "12:00 PM",
      location: "Community Park",
      category: "Fellowship",
      attendees: 200,
      status: "Scheduled",
    },
  ];

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

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Events
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24</div>
            <p className="text-xs text-gray-300">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              This Month
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">8</div>
            <p className="text-xs text-gray-300">Scheduled events</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Attendees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,234</div>
            <p className="text-xs text-gray-300">+15% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Locations
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">6</div>
            <p className="text-xs text-gray-300">Active venues</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
        <Button
          variant="outline"
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Events Table */}
      <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Event</TableHead>
              <TableHead className="text-white">Date & Time</TableHead>
              <TableHead className="text-white">Location</TableHead>
              <TableHead className="text-white">Category</TableHead>
              <TableHead className="text-white">Attendees</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-right text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium text-white">
                  {event.title}
                </TableCell>
                <TableCell>
                  <div className="text-sm text-white">
                    <div>{new Date(event.date).toLocaleDateString()}</div>
                    <div className="text-gray-300">{event.time}</div>
                  </div>
                </TableCell>
                <TableCell className="text-white">{event.location}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="text-white border-white/20"
                  >
                    {event.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-white">{event.attendees}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
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
                      <DropdownMenuItem className="text-white hover:bg-white/20">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive hover:bg-white/20">
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
      </Card>
    </div>
  );
}
