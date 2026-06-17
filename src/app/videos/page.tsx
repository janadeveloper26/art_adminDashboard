"use client";

import React, { useRef, useState, useEffect } from "react";
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
import { useUploadContext } from "../../contexts/UploadContext";
import { MOCK_VIDEOS } from "../../lib/mockData";
import { apiFetch } from "../../lib/api";

export interface VideoItem {
  id: number | string;
  title: string;
  duration?: string;
  status: string;
  thumbnail?: string;
  views?: number;
  drm?: boolean;
}

export default function VideosPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { upload } = useUploadContext();
  const [title, setTitle] = useState("");
  const [sectionId, setSectionId] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [sections, setSections] = useState<any[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [sectionsLoading, setSectionsLoading] = useState(false);

  useEffect(() => {
    if (isUploadModalOpen && courses.length === 0) {
      const loadCourses = async () => {
        try {
          setCoursesLoading(true);
          const data = await apiFetch(`/courses/explore`);
          setCourses(data.data?.courses || []);
        } catch (err) {
          console.error(err);
        } finally {
          setCoursesLoading(false);
        }
      };
      loadCourses();
    }
  }, [isUploadModalOpen, courses.length]);

  useEffect(() => {
    if (selectedCourseId) {
      const loadSections = async () => {
        try {
          setSectionsLoading(true);
          setSections([]);
          setSectionId("");
          const data = await apiFetch(`/courses/${selectedCourseId}/sections`);
          const payload = data.data || data;
          const fetchedSections = payload.sections || payload.results || payload.curriculum || (Array.isArray(payload) ? payload : []);
          setSections(fetchedSections);
        } catch (err) {
          console.error(err);
        } finally {
          setSectionsLoading(false);
        }
      };
      loadSections();
    } else {
      setSections([]);
      setSectionId("");
    }
  }, [selectedCourseId]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const data = await apiFetch(`/courses/lessons`);
        // Assume the API returns an array of videos in `data` or `data.results`
        const apiVideos = data.results || data;
        setVideos(apiVideos && apiVideos.length > 0 ? apiVideos : MOCK_VIDEOS);
      } catch (err) {
        console.error("Failed to fetch videos", err);
        setVideos(MOCK_VIDEOS);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

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
            {videos.map((video) => (
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
                        {(video.views || 0).toLocaleString()} views
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
                {videos.map((video) => (
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
            <DrawerTitle>Upload Video</DrawerTitle>
            <DrawerDescription>
              File uploads directly to S3 — your server stays fast.
            </DrawerDescription>
          </DrawerHeader>

          <div className="py-6 space-y-6">
            {/* Metadata */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Lesson title
                </label>
                <Input
                  className="mt-1"
                  placeholder="e.g. Introduction to React Hooks"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
                    Course
                  </label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                  >
                    <option value="">Select a course...</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                  {coursesLoading && <p className="text-xs text-muted-foreground mt-1">Loading courses...</p>}
                </div>

                <div className="flex-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
                    Section
                  </label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={sectionId}
                    onChange={(e) => setSectionId(e.target.value)}
                    disabled={!selectedCourseId || sectionsLoading || sections.length === 0}
                  >
                    <option value="">Select a section...</option>
                    {sections.map((s) => (
                      <option key={s.id} value={s.id}>{s.title || s.name}</option>
                    ))}
                  </select>
                  {sectionsLoading && <p className="text-xs text-muted-foreground mt-1">Loading sections...</p>}
                  {!sectionsLoading && selectedCourseId && sections.length === 0 && (
                    <p className="text-xs text-destructive mt-1">No sections exist for this course. Please create one in Course Management first.</p>
                  )}
                </div>
              </div>
            </div>
            {/* Drop zone — always shown until an upload is actively blocking */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const f = e.dataTransfer.files[0];
                  if (f) setSelectedFile(f);
                }}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center 
          justify-center text-center cursor-pointer transition-colors
          ${dragOver ? "border-primary bg-primary/5" : "border-border hover:bg-surface"}
          ${selectedFile ? "bg-primary/5 border-primary/50" : ""}`}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {selectedFile ? (
                    <Video size={24} />
                  ) : (
                    <CloudUpload size={24} />
                  )}
                </div>
                <h4 className="font-semibold">
                  {selectedFile ? selectedFile.name : "Drop your video here"}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedFile
                    ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
                    : "MP4, MOV, or WEBM up to 5 GB"}
                </p>
                <Button
                  size="sm"
                  className="mt-4"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileRef.current?.click();
                  }}
                >
                  {selectedFile ? "Change file" : "Select file"}
                </Button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setSelectedFile(f);
                  }}
                />
              </div>

            {/* Security toggles — unchanged from your original */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Security settings
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
                      Prevent unauthorized downloads.
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
                      Overlay user email on playback.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button
                className="flex-1"
                disabled={!title || !sectionId || !selectedFile}
                onClick={() => {
                  if (selectedFile) {
                    upload(selectedFile, { sectionId, title });
                      setSelectedFile(null);
                      setTitle("");
                      setSectionId("");
                      setSelectedCourseId("");
                      if (fileRef.current) fileRef.current.value = "";
                    }
                  }}
                >
                  Start Upload
                </Button>

              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setSelectedFile(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
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
