import { updateEvent } from "@/app/admin/hooks/events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BaseEvent, CATEGORIES } from "@/lib/types/events";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import React from "react";

export  function EditEventDialog({
  isEditDialogOpen,
  setIsEditDialogOpen,
  editingEvent,
}: {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  editingEvent: BaseEvent | null;
}) {
  return (
    <>
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
    </>
  );
}
