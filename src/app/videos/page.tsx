"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  MoreVertical,
  Video,
  Play,
  Clock,
  ShieldCheck,
  Type,
  CloudUpload,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  Button,
  Input,
  Card,
  CardContent,
  Badge,
  Switch,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const videoData = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    duration: "12:45",
    status: "Published",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
    views: 4230,
    drm: true,
  },
  {
    id: 2,
    title: "State Management with Redux",
    duration: "45:20",
    status: "Encoding",
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=225&fit=crop",
    views: 0,
    drm: true,
  },
  {
    id: 3,
    title: "Advanced CSS Grid Layouts",
    duration: "22:15",
    status: "Published",
    thumbnail:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=225&fit=crop",
    views: 2105,
    drm: false,
  },
  {
    id: 4,
    title: "Building a REST API with Node",
    duration: "38:10",
    status: "Published",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop",
    views: 1840,
    drm: true,
  },
  {
    id: 5,
    title: "TypeScript Fundamentals",
    duration: "1:05:30",
    status: "Error",
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop",
    views: 0,
    drm: true,
  },
  {
    id: 6,
    title: "Design Systems with Figma",
    duration: "28:50",
    status: "Published",
    thumbnail:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop",
    views: 5621,
    drm: false,
  },
];

export default function VideosPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Video Library</h1>
          <p className="text-muted-foreground mt-1">
            Manage, protect, and distribute your video content.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsUploadModalOpen(true)}>
          <CloudUpload size={18} />
          <span>Upload Video</span>
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input placeholder="Search videos..." className="pl-10 h-10" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-2"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-2"
                onClick={() => setViewMode("list")}
              >
                <List size={16} />
              </Button>
            </div>
            <Button variant="outline" size="sm">
              Most Recent
            </Button>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {videoData.map((video) => (
              <Card
                key={video.id}
                className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-none shadow-sm"
              >
                <div className="relative aspect-video">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play
                        className="text-white fill-current ml-1"
                        size={24}
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {video.duration}
                  </div>
                  {video.drm && (
                    <div
                      className="absolute top-2 left-2 bg-primary/90 text-white p-1 rounded-md"
                      title="DRM Protected"
                    >
                      <ShieldCheck size={14} />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm line-clamp-1">
                      {video.title}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                    >
                      <MoreVertical size={14} />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          video.status === "Published"
                            ? "success"
                            : video.status === "Encoding"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-[10px] px-1.5 py-0"
                      >
                        {video.status === "Encoding" && (
                          <Loader2 size={10} className="animate-spin mr-1" />
                        )}
                        {video.status}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {video.views.toLocaleString()} views
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      Added 2d ago
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border border-border bg-white overflow-hidden shadow-sm"
          >
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-[100px]">Preview</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Protection</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videoData.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell>
                      <div className="w-16 h-10 rounded bg-muted overflow-hidden relative">
                        <ImageWithFallback
                          src={video.thumbnail}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{video.title}</TableCell>
                    <TableCell>{video.duration}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          video.status === "Published" ? "success" : "outline"
                        }
                      >
                        {video.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {video.drm ? (
                          <ShieldCheck size={16} className="text-primary" />
                        ) : (
                          <X size={16} className="text-muted-foreground" />
                        )}
                        <span className="text-xs">
                          {video.drm ? "DRM On" : "No DRM"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        )}
      </AnimatePresence>

      <Drawer open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DrawerContent className="max-w-xl">
          <DrawerHeader>
            <DrawerTitle>Upload Content</DrawerTitle>
            <DrawerDescription>
              Upload videos to your library with automatic encoding and
              protection.
            </DrawerDescription>
          </DrawerHeader>

          <div className="py-6 space-y-8">
            <div className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center text-center bg-surface/50 hover:bg-surface transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <CloudUpload size={24} />
              </div>
              <h4 className="font-semibold">Drop your video here</h4>
              <p className="text-sm text-muted-foreground mt-1">
                MP4, MOV, or WEBM up to 2GB
              </p>
              <Button size="sm" className="mt-4">
                Select Files
              </Button>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Uploading
              </h4>
              <div className="p-4 border rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Video size={18} className="text-primary" />
                    <span className="text-sm font-medium">
                      advanced-redux-patterns.mp4
                    </span>
                  </div>
                  <span className="text-xs font-bold text-primary">65%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    className="h-full bg-primary"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>3.2 MB/s • 45s remaining</span>
                  <span>142 MB of 218 MB</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Global Security Settings
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-primary" />
                      <span className="text-sm font-semibold">
                        DRM Protection
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Prevent unauthorized downloads and recording.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Type size={16} className="text-primary" />
                      <span className="text-sm font-semibold">
                        Dynamic Watermarking
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Overlay user&apos;s email address on the video.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button
                className="flex-1"
                onClick={() => setIsUploadModalOpen(false)}
              >
                Complete Upload
              </Button>
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setIsUploadModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
