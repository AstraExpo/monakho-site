"use client";

import React, { useState } from "react";
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
  Image as ImageIcon,
} from "lucide-react";
import {
  CATEGORIES,
  RECURRENCE_TYPES,
  EventCreateRequest,
  Category,
  VenueType,
  RecurrenceType,
} from "@/lib/types/events";
import { uploadFileViaApi } from "@/lib/server/uploadFile";

export function CreateEventForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<EventCreateRequest>({
    title: "",
    description: "",
    date: "",
    time: "",

    venueType: "Physical",
    venueName: "",
    venueUrl: "",

    category: "Other",
    status: "Draft",

    isPublic: true,
    attendees: 0,
    maxAttendees: null,

    isRecurring: false,
    recurrenceType: undefined,
    recurrenceEndDate: undefined,

    posterUrl: "",
  });

  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPosterFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let posterUrl: string | undefined = formData.posterUrl;
      if (posterFile) {
        posterUrl = await uploadFileViaApi(
          posterFile,
          `events/${formData.category}/posters`
        );
      }

      const payload: EventCreateRequest = {
        ...formData,
        posterUrl,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Title */}
        <div className="sm:col-span-2">
          <Label htmlFor="title" className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Event Title
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter event title"
            required
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
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

        {/* Poster Upload */}
        <div className="sm:col-span-2">
          <Label htmlFor="poster" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Event Poster (Optional)
          </Label>
          <Input
            id="poster"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        {/* Date */}
        <div>
          <Label htmlFor="date" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formData.isRecurring ? "Start Date" : "Date"}
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, time: e.target.value })
            }
            required
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        {/* Recurrence fields */}
        {formData.isRecurring && (
          <>
            <div>
              <Label htmlFor="recurrenceType">Recurrence Type</Label>
              <Select
                value={formData.recurrenceType ?? ""}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    recurrenceType: value as RecurrenceType,
                  })
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
                value={formData.recurrenceEndDate ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    recurrenceEndDate: e.target.value,
                  })
                }
                required
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
                venueType: value as VenueType,
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
              value={formData.venueName ?? ""}
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
              value={formData.venueUrl ?? ""}
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
              setFormData({ ...formData, category: value as Category })
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
        <div className="sm:col-span-2">
          <Label htmlFor="maxAttendees" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Maximum Attendees (Optional)
          </Label>
          <Input
            id="maxAttendees"
            type="number"
            value={formData.maxAttendees ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                maxAttendees: e.target.value ? Number(e.target.value) : null,
              })
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
              recurrenceType: checked ? "Weekly" : undefined,
              recurrenceEndDate: checked ? formData.date : undefined,
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
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          {loading ? "Creating..." : "Create Event"}
        </Button>
      </DialogFooter>
    </form>
  );
}