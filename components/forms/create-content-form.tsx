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
import { FileText, User, Tag, Calendar } from "lucide-react"

export function CreateContentForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    type: "",
    category: "",
    author: "",
    publishDate: "",
    tags: "",
    isPublished: false,
    isFeatured: false,
    allowComments: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating content:", formData)
    // Here you would typically send the data to your API
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="title" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Content Title
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter content title"
            required
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div>
          <Label htmlFor="type">Content Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sermon">Sermon</SelectItem>
              <SelectItem value="article">Article</SelectItem>
              <SelectItem value="resource">Resource</SelectItem>
              <SelectItem value="devotional">Devotional</SelectItem>
              <SelectItem value="testimony">Testimony</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category" className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Category
          </Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="faith">Faith</SelectItem>
              <SelectItem value="prayer">Prayer</SelectItem>
              <SelectItem value="relationships">Relationships</SelectItem>
              <SelectItem value="youth">Youth</SelectItem>
              <SelectItem value="worship">Worship</SelectItem>
              <SelectItem value="service">Service</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="author" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Author
          </Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="Content author"
            required
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div>
          <Label htmlFor="publishDate" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Publish Date
          </Label>
          <Input
            id="publishDate"
            type="date"
            value={formData.publishDate}
            onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the content..."
            rows={2}
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="content">Content Body</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Enter the main content here..."
            rows={6}
            required
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="faith, hope, love, community"
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="published"
            checked={formData.isPublished}
            onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked as boolean })}
          />
          <Label htmlFor="published">Publish immediately</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={formData.isFeatured}
            onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked as boolean })}
          />
          <Label htmlFor="featured">Feature this content</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="comments"
            checked={formData.allowComments}
            onCheckedChange={(checked) => setFormData({ ...formData, allowComments: checked as boolean })}
          />
          <Label htmlFor="comments">Allow comments</Label>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
        >
          Create Content
        </Button>
      </DialogFooter>
    </form>
  )
}
