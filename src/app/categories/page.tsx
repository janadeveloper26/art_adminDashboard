"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Layers, Loader2, Edit, Trash2 } from "lucide-react";
import {
  Button,
  Input,
  Card,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "../../components/ui";
import { MOCK_CATEGORIES } from "../../lib/mockData";

import { apiFetch } from "../../lib/api";

export interface CategoryItem {
  id: string;
  name: string;
  order?: number;
  slug?: string;
  course_count?: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [order, setOrder] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getHeaders = () => {
    const token = localStorage.getItem("access_token");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await apiFetch(`/courses/categories`);
      if (res) {
        const data = res;
        let payload = data.data || data;
        if (!Array.isArray(payload)) {
          payload = payload?.results || payload?.categories || [];
        }
        
        const formattedCategories = Array.isArray(payload) ? payload.map((item, index) => {
          if (typeof item === 'string') {
            return {
              id: item, // Use name as ID
              name: item,
              slug: item.toLowerCase().replace(/\s+/g, '-'),
              order: index,
              course_count: 0
            };
          }
          return item;
        }) : [];
        
        setCategories(formattedCategories);
      } else {
        setCategories(MOCK_CATEGORIES);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
      setCategories(MOCK_CATEGORIES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await apiFetch(`/courses/categories`, {
        method: "POST",
        body: JSON.stringify({ name, order }),
      });
      if (res) {
        alert("Category created successfully!");
        setIsDrawerOpen(false);
        setName("");
        setOrder(0);
        fetchCategories();
      } else {
        alert("Failed to create category");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Layers size={24} className="text-primary" />
            Category Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Organize your courses into structured categories.
          </p>
        </div>
        <Button className="gap-2 self-start sm:self-auto" onClick={() => setIsDrawerOpen(true)}>
          <Plus size={18} />
          <span>Create Category</span>
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input
              placeholder="Search categories by name..."
              className="pl-10 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2" onClick={fetchCategories}>
            <Search size={18} />
            <span>Refresh</span>
          </Button>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm overflow-hidden bg-card text-card-foreground">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50/50 dark:bg-blue-900/20">
              <TableHead>Category Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2 className="animate-spin text-primary mx-auto" size={24} />
                </TableCell>
              </TableRow>
            ) : filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No categories found. Create one to get started!
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-semibold">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground">{category.slug || "-"}</TableCell>
                  <TableCell>{category.order ?? 0}</TableCell>
                  <TableCell>{category.course_count ?? 0}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-w-md p-6">
          <DrawerHeader className="px-0 pt-0">
            <DrawerTitle>Create New Category</DrawerTitle>
            <DrawerDescription>Add a new category to organize your courses.</DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleCreate} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category Name</label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Web Development"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Order</label>
              <Input
                type="number"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                placeholder="e.g. 0"
              />
              <p className="text-xs text-muted-foreground mt-1">Lower numbers appear first.</p>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
              Create Category
            </Button>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
