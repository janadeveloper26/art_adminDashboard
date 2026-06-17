import React, { useState, useEffect } from "react";
import { Button, Input, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "./ui";
import { MOCK_CATEGORIES } from "../lib/mockData";

interface CreateCourseFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export function CreateCourseDrawer({ isOpen, onOpenChange, onSubmit }: CreateCourseFormProps) {
  const [formData, setFormData] = useState({
    title: "", category_id: "", price: "", original_price: "",
    description: "", level: "BEGINNER", instructor_role: "Instructor",
    is_published: false, is_featured: false,
  });
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);

  useEffect(() => {
    if (isOpen) {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://192.168.29.72:8000/api/v1";
      fetch(`${API_BASE}/courses/categories`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      })
      .then(async r => {
        if (!r.ok) { setCategories(MOCK_CATEGORIES); return; }
        const data = await r.json();
        let payload = data.data || data;
        if (!Array.isArray(payload)) payload = payload?.results || payload?.categories || [];
        setCategories(Array.isArray(payload) ? payload : MOCK_CATEGORIES);
      })
      .catch(() => setCategories(MOCK_CATEGORIES));
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
    setFormData({
      title: "", category_id: "", price: "", original_price: "",
      description: "", level: "BEGINNER", instructor_role: "Instructor",
      is_published: false, is_featured: false,
    });
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-md p-6">
        <DrawerHeader className="px-0 pt-0">
          <DrawerTitle>Create New Course</DrawerTitle>
          <DrawerDescription>Enter the basic details for the new course.</DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Course Title</label>
            <Input 
              required 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              placeholder="e.g. Advanced React Patterns" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required 
              value={formData.category_id} 
              onChange={(e) => setFormData({...formData, category_id: e.target.value})} 
            >
              <option value="" disabled>Select a category...</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Price ($)</label>
            <Input 
              required 
              type="number" 
              value={formData.price} 
              onChange={(e) => setFormData({...formData, price: e.target.value})} 
              placeholder="e.g. 49.99" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Original Price ($)</label>
            <Input
              type="number"
              value={formData.original_price}
              onChange={(e) => setFormData({...formData, original_price: e.target.value})}
              placeholder="e.g. 99.99"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Level</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={formData.level}
              onChange={(e) => setFormData({...formData, level: e.target.value})}
            >
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Instructor Role</label>
            <Input
              value={formData.instructor_role}
              onChange={(e) => setFormData({...formData, instructor_role: e.target.value})}
              placeholder="e.g. Lead Instructor"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                className="h-4 w-4"
              />
              Published
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                className="h-4 w-4"
              />
              Featured
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea 
              className="w-full min-h-[100px] flex rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              required 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              placeholder="Course description..." 
            />
          </div>
          <Button type="submit" className="w-full">Create Course</Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

interface CreateSectionFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string) => void;
}

export function CreateSectionDrawer({ isOpen, onOpenChange, onSubmit }: CreateSectionFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title);
    onOpenChange(false);
    setTitle("");
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-md p-6">
        <DrawerHeader className="px-0 pt-0">
          <DrawerTitle>Add Curriculum Section</DrawerTitle>
          <DrawerDescription>Create a new section/module for your course.</DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Section Title</label>
            <Input 
              required 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. Module 1: Introduction" 
            />
          </div>
          <Button type="submit" className="w-full">Create Section</Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

interface CreateLessonFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string, file: File | null, videoUrl: string) => void;
}

export function CreateLessonDrawer({ isOpen, onOpenChange, onSubmit }: CreateLessonFormProps) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, file, videoUrl);
    onOpenChange(false);
    setTitle("");
    setFile(null);
    setVideoUrl("");
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-md p-6">
        <DrawerHeader className="px-0 pt-0">
          <DrawerTitle>Add Lesson</DrawerTitle>
          <DrawerDescription>Create a new lesson and upload video content.</DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Lesson Title</label>
            <Input 
              required 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. Setup Environment" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Direct Video URL (Optional)</label>
            <Input 
              value={videoUrl} 
              onChange={(e) => setVideoUrl(e.target.value)} 
              placeholder="e.g. https://example.com/video.mp4" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Upload Video File</label>
            <Input 
              type="file" 
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
            />
            <p className="text-xs text-muted-foreground mt-1">Leave empty if using a direct URL.</p>
          </div>
          <Button type="submit" className="w-full">Add Lesson</Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
