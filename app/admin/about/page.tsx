"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  Users,
  Award,
  Heart,
  Globe,
} from "lucide-react";

export default function AdminAboutPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Pastor John Monakho",
      role: "Senior Pastor",
      bio: "Leading our community with 15+ years of ministry experience",
      email: "john@monakhoministry.org",
      phone: "(555) 123-4567",
      image: "/placeholder.svg?height=200&width=200",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Youth Director",
      bio: "Passionate about connecting with the next generation",
      email: "sarah@monakhoministry.org",
      phone: "(555) 123-4568",
      image: "/placeholder.svg?height=200&width=200",
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Music Director",
      bio: "Creating worship experiences that touch hearts",
      email: "michael@monakhoministry.org",
      phone: "(555) 123-4569",
      image: "/placeholder.svg?height=200&width=200",
      status: "Active",
    },
    {
      id: 4,
      name: "Grace Thompson",
      role: "Community Outreach",
      bio: "Building bridges in our local community",
      email: "grace@monakhoministry.org",
      phone: "(555) 123-4570",
      image: "/placeholder.svg?height=200&width=200",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            About Page Management
          </h1>
          <p className="text-muted-foreground">
            Manage ministry information and team members
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Mission & Vision */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-blue-500" />
              Mission Statement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter your mission statement..."
              defaultValue="To create a welcoming community where people can discover God's love, grow in their faith, and make a positive impact in the world around them."
              rows={4}
              className="bg-background/50 backdrop-blur-sm border-border/50"
            />
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Faith</Badge>
              <Badge variant="secondary">Community</Badge>
              <Badge variant="secondary">Growth</Badge>
              <Badge variant="secondary">Service</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-500" />
              Vision Statement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter your vision statement..."
              defaultValue="To be a beacon of hope and transformation in our community, empowering individuals to live purposeful lives and create lasting positive change."
              rows={4}
              className="bg-background/50 backdrop-blur-sm border-border/50"
            />
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Hope</Badge>
              <Badge variant="secondary">Transformation</Badge>
              <Badge variant="secondary">Purpose</Badge>
              <Badge variant="secondary">Impact</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Core Values */}
      <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-500" />
            Core Values
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value1">Value 1</Label>
              <Input
                id="value1"
                defaultValue="Love"
                className="bg-background/50 backdrop-blur-sm border-border/50"
              />
              <Textarea
                placeholder="Description..."
                defaultValue="Showing Christ's love in everything we do"
                rows={2}
                className="bg-background/50 backdrop-blur-sm border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value2">Value 2</Label>
              <Input
                id="value2"
                defaultValue="Community"
                className="bg-background/50 backdrop-blur-sm border-border/50"
              />
              <Textarea
                placeholder="Description..."
                defaultValue="Building strong, supportive relationships"
                rows={2}
                className="bg-background/50 backdrop-blur-sm border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value3">Value 3</Label>
              <Input
                id="value3"
                defaultValue="Service"
                className="bg-background/50 backdrop-blur-sm border-border/50"
              />
              <Textarea
                placeholder="Description..."
                defaultValue="Serving our local and global communities"
                rows={2}
                className="bg-background/50 backdrop-blur-sm border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value4">Value 4</Label>
              <Input
                id="value4"
                defaultValue="Excellence"
                className="bg-background/50 backdrop-blur-sm border-border/50"
              />
              <Textarea
                placeholder="Description..."
                defaultValue="Pursuing excellence in all our ministries"
                rows={2}
                className="bg-background/50 backdrop-blur-sm border-border/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Management */}
      <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-500" />
            Team Members
          </CardTitle>
          <Button
            variant="outline"
            className="bg-background/50 backdrop-blur-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="border border-border/50 bg-background/30 backdrop-blur-sm"
              >
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <Badge variant="outline" className="mt-2">
                      {member.role}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center">
                    {member.bio}
                  </p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>{member.email}</p>
                    <p>{member.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:text-destructive bg-transparent"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
