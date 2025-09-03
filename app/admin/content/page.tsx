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
  FileText,
  Eye,
  Download,
  MoreHorizontal,
  Table,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/drop-down-menu";
import { CreateContentForm } from "@/components/forms/create-content-form";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function AdminContentPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const content = [
    {
      id: 1,
      title: "Finding Hope in Difficult Times",
      type: "Sermon",
      author: "Pastor John Monakho",
      date: "2024-01-14",
      status: "Published",
      views: 1245,
      downloads: 245,
    },
    {
      id: 2,
      title: "The Power of Prayer",
      type: "Article",
      author: "Sarah Williams",
      date: "2024-01-10",
      status: "Published",
      views: 892,
      downloads: 189,
    },
    {
      id: 3,
      title: "Building Strong Relationships",
      type: "Sermon",
      author: "Pastor John Monakho",
      date: "2024-01-07",
      status: "Published",
      views: 1567,
      downloads: 312,
    },
    {
      id: 4,
      title: "Youth Ministry Guide",
      type: "Resource",
      author: "Sarah Williams",
      date: "2024-01-03",
      status: "Draft",
      views: 0,
      downloads: 0,
    },
    {
      id: 5,
      title: "Worship Through Music",
      type: "Sermon",
      author: "Michael Chen",
      date: "2023-12-31",
      status: "Published",
      views: 1123,
      downloads: 278,
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Sermon":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Article":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Resource":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
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
            Content Management
          </h1>
          <p className="text-muted-foreground">
            Manage sermons, articles, and resources
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              <Plus className="w-4 h-4 mr-2" />
              New Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl bg-white/10 backdrop-blur-md border border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">
                Create New Content
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Create a new sermon, article, or resource for your ministry.
              </DialogDescription>
            </DialogHeader>
            <CreateContentForm onClose={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Content
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">47</div>
            <p className="text-xs text-gray-300">+5 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Views
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12.4K</div>
            <p className="text-xs text-gray-300">+18% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Downloads
            </CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3.2K</div>
            <p className="text-xs text-gray-300">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Published
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">42</div>
            <p className="text-xs text-gray-300">5 drafts remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search content..."
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

      {/* Content Table */}
      <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Title</TableHead>
              <TableHead className="text-white">Type</TableHead>
              <TableHead className="text-white">Author</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Views</TableHead>
              <TableHead className="text-white">Downloads</TableHead>
              <TableHead className="text-right text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium max-w-xs truncate text-white">
                  {item.title}
                </TableCell>
                <TableCell>
                  <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                </TableCell>
                <TableCell className="text-white">{item.author}</TableCell>
                <TableCell className="text-white">
                  {new Date(item.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-white">
                  {item.views.toLocaleString()}
                </TableCell>
                <TableCell className="text-white">{item.downloads}</TableCell>
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
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
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
