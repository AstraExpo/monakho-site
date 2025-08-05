"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
  Link2,
  Repeat,
} from "lucide-react";

const CATEGORIES = [
  "Prayer Meeting",
  "Live Recording",
  "Worship Practice",
  "Livestream Worship",
  "Bible Study",
  "Outreach",
  "Conference",
  "Other",
];

const RECURRENCE_TYPES = ["Daily", "Weekly", "Monthly"];

export function CreateEventForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venueType: "",
    venueName: "",
    venueUrl: "",
    category: "",
    status: "Draft",
    attendees: 0,
    maxAttendees: "",
    isPublic: true,
    isRecurring: false,
    recurrenceType: "",
    recurrenceEndDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Venue type validation
    if (formData.venueType === "Physical" && !formData.venueName) {
      alert("Please enter the venue name for a physical event.");
      return;
    }
    if (formData.venueType === "Online" && !formData.venueUrl) {
      alert("Please enter the online event link.");
      return;
    }

    // Recurrence validation
    if (formData.isRecurring) {
      if (!formData.recurrenceType) {
        alert("Please select a recurrence type.");
        return;
      }
      if (!formData.date) {
        alert("Please select a start date for the recurring event.");
        return;
      }
      if (!formData.recurrenceEndDate) {
        alert("Please select an end date for the recurring event.");
        return;
      }
    }

    try {
      const payload = {
        ...formData,
        maxAttendees: formData.maxAttendees
          ? Number(formData.maxAttendees)
          : null,
      };

      const res = await fetch("/api/events/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create event");

      alert("✅ Event created successfully!");
      onClose();
    } catch (err: any) {
      alert(`❌ ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Title */}
        <div className="col-span-2">
          <Label htmlFor="title" className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Event Title
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter event title"
            required
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe your event..."
            rows={3}
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        {/* Start Date */}
        <div>
          <Label htmlFor="date" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formData.isRecurring ? "Start Date" : "Date"}
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        {/* Time */}
        <div>
          <Label htmlFor="time" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Time
          </Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        {/* Recurrence Type & End Date (Only if recurring) */}
        {formData.isRecurring && (
          <>
            <div>
              <Label htmlFor="recurrenceType">Recurrence Type</Label>
              <Select
                value={formData.recurrenceType}
                onValueChange={(value) =>
                  setFormData({ ...formData, recurrenceType: value })
                }
              >
                <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20">
                  <SelectValue placeholder="Select recurrence" />
                </SelectTrigger>
                <SelectContent>
                  {RECURRENCE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="recurrenceEndDate">End Date</Label>
              <Input
                id="recurrenceEndDate"
                type="date"
                value={formData.recurrenceEndDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    recurrenceEndDate: e.target.value,
                  })
                }
                required={formData.isRecurring}
                className="bg-white/10 backdrop-blur-sm border-white/20"
              />
            </div>
          </>
        )}

        {/* Venue Type */}
        <div>
          <Label htmlFor="venueType">Venue Type</Label>
          <Select
            value={formData.venueType}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                venueType: value,
                venueName: "",
                venueUrl: "",
              })
            }
          >
            <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20">
              <SelectValue placeholder="Select venue type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Physical">Physical</SelectItem>
              <SelectItem value="Online">Online</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Venue Name */}
        {formData.venueType === "Physical" && (
          <div>
            <Label htmlFor="venueName" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Venue Name
            </Label>
            <Input
              id="venueName"
              value={formData.venueName}
              onChange={(e) =>
                setFormData({ ...formData, venueName: e.target.value })
              }
              placeholder="e.g., Room 3, Fellowship Hall"
              className="bg-white/10 backdrop-blur-sm border-white/20"
            />
          </div>
        )}

        {/* Venue URL */}
        {formData.venueType === "Online" && (
          <div>
            <Label htmlFor="venueUrl" className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              Online Event Link
            </Label>
            <Input
              id="venueUrl"
              type="url"
              value={formData.venueUrl}
              onChange={(e) =>
                setFormData({ ...formData, venueUrl: e.target.value })
              }
              placeholder="https://meet.google.com/xyz"
              className="bg-white/10 backdrop-blur-sm border-white/20"
            />
          </div>
        )}

        {/* Category */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Max Attendees */}
        <div className="col-span-2">
          <Label htmlFor="maxAttendees" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Maximum Attendees (Optional)
          </Label>
          <Input
            id="maxAttendees"
            type="number"
            value={formData.maxAttendees}
            onChange={(e) =>
              setFormData({ ...formData, maxAttendees: e.target.value })
            }
            placeholder="Leave empty for unlimited"
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>
      </div>

      {/* Recurring Event Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isRecurring"
          checked={formData.isRecurring}
          onCheckedChange={(checked) =>
            setFormData({
              ...formData,
              isRecurring: checked as boolean,
              recurrenceType: "",
              recurrenceEndDate: "",
            })
          }
        />
        <Label htmlFor="isRecurring" className="flex items-center gap-2">
          <Repeat className="w-4 h-4" /> This is a recurring event
        </Label>
      </div>

      {/* Public */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="public"
          checked={formData.isPublic}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isPublic: checked as boolean })
          }
        />
        <Label htmlFor="public">Make event public</Label>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          Create Event
        </Button>
      </DialogFooter>
    </form>
  );
}
