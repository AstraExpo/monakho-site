"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogFooter } from "@/components/ui/dialog"
import { Calendar, Clock, MapPin, Users, Tag } from "lucide-react"

export function CreateEventForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    maxAttendees: "",
    isRecurring: false,
    requiresRegistration: true,
    isPublic: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating event:", formData)
    // Here you would typically send the data to your API
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
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

        <div className="col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your event..."
            rows={3}
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div>
          <Label htmlFor="date" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date
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

        <div>
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Event location"
            required
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="worship">Worship</SelectItem>
              <SelectItem value="study">Bible Study</SelectItem>
              <SelectItem value="service">Community Service</SelectItem>
              <SelectItem value="prayer">Prayer</SelectItem>
              <SelectItem value="fellowship">Fellowship</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2">
          <Label htmlFor="maxAttendees" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Maximum Attendees (Optional)
          </Label>
          <Input
            id="maxAttendees"
            type="number"
            value={formData.maxAttendees}
            onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
            placeholder="Leave empty for unlimited"
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="recurring"
            checked={formData.isRecurring}
            onCheckedChange={(checked) => setFormData({ ...formData, isRecurring: checked as boolean })}
          />
          <Label htmlFor="recurring">This is a recurring event</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="registration"
            checked={formData.requiresRegistration}
            onCheckedChange={(checked) => setFormData({ ...formData, requiresRegistration: checked as boolean })}
          />
          <Label htmlFor="registration">Requires registration</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="public"
            checked={formData.isPublic}
            onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked as boolean })}
          />
          <Label htmlFor="public">Make event public</Label>
        </div>
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
  )
}
