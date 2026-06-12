"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  BookOpen,
  Video,
  FileText,
  ChevronRight,
  ChevronDown,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import {
  Button,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  Card,
  CardContent,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://192.168.29.72:8000/api/v1";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [detailLoading, setDetailLoading] = useState(false);

  const getHeaders = () => {
    const token = localStorage.getItem("access_token");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/courses/explore`, {
        headers: getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setCourses(data.data?.courses || []);
      }
    } catch (err) {
      console.error("Failed to fetch courses", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCourses();
  }, []);

  const handleRowClick = async (course: any) => {
    setSelectedCourse(course);
    setSelectedCourseDetail(null);
    setIsDrawerOpen(true);

    // Fetch full detail for the drawer
    try {
      setDetailLoading(true);
      const res = await fetch(`${API_BASE}/courses/${course.id}`, {
        headers: getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedCourseDetail(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Course Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your educational catalog and content.
          </p>
        </div>
        <Button className="gap-2 self-start sm:self-auto">
          <Plus size={18} />
          <span>Create New Course</span>
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input
              placeholder="Search courses by name or ID..."
              className="pl-10 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              className="gap-2 flex-1 md:flex-none"
              onClick={fetchCourses}
            >
              <Search size={18} />
              <span>Refresh</span>
            </Button>
            <Button variant="outline" className="gap-2 flex-1 md:flex-none">
              <span>Category</span>
              <ChevronDown size={18} />
            </Button>
            <Button variant="outline" className="gap-2 flex-1 md:flex-none">
              <span>Status</span>
              <ChevronDown size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-[400px]">Course Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Students</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Loading courses...
                </TableCell>
              </TableRow>
            ) : (
              courses
                .filter((c) =>
                  c.title?.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map((course) => (
                  <TableRow
                    key={course.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleRowClick(course)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                          <BookOpen size={18} className="text-primary" />
                        </div>
                        <span className="font-semibold">{course.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{course.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      ${course.price}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          course.status === "Active" ? "success" : "outline"
                        }
                        className="gap-1"
                      >
                        <CheckCircle2 size={12} />
                        {course.status || "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {course.students || course.reviews || 0}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary"
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
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

      {courses.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <BookOpen size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No courses found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your filters or search terms.
          </p>
        </div>
      )}

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-w-2xl">
          <DrawerHeader className="border-b pb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <BookOpen size={24} />
              </div>
              <div>
                <DrawerTitle className="text-xl">
                  {selectedCourse?.title}
                </DrawerTitle>
                <DrawerDescription>
                  Course ID: {selectedCourse?.id}
                </DrawerDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                Edit Course
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                View Live Page
              </Button>
            </div>
          </DrawerHeader>

          {detailLoading ? (
            <div className="py-20 text-center text-muted-foreground flex items-center justify-center gap-2">
              Loading details...
            </div>
          ) : (
            <div className="py-6">
              <Tabs defaultValue="details">
                <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
                  <TabsTrigger
                    value="details"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="curriculum"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                  >
                    Curriculum
                  </TabsTrigger>
                  <TabsTrigger
                    value="pricing"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                  >
                    Pricing
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                        Category
                      </p>
                      <p className="font-medium">
                        {selectedCourseDetail?.category ||
                          selectedCourse?.category}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                        Level
                      </p>
                      <Badge variant="outline">
                        {selectedCourseDetail?.level || selectedCourse?.level}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                        Instructor
                      </p>
                      <p className="font-medium">
                        {selectedCourseDetail?.instructor ||
                          selectedCourse?.instructor}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedCourseDetail?.instructor_role}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                        Total Duration
                      </p>
                      <p className="font-medium">
                        {selectedCourseDetail?.duration}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                      Description
                    </p>
                    <p className="text-sm leading-relaxed text-secondary-foreground">
                      {selectedCourseDetail?.description ||
                        "No description provided."}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-4">
                  {selectedCourseDetail?.curriculum?.length > 0 ? (
                    selectedCourseDetail.curriculum.map(
                      (section: any, idx: number) => (
                        <Card
                          key={section.id || idx}
                          className="border-border shadow-none"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-secondary flex items-center justify-center text-[10px] font-bold">
                                  M{idx + 1}
                                </span>
                                <h4 className="font-semibold">
                                  {section.title}
                                </h4>
                              </div>
                              <ChevronDown size={16} />
                            </div>
                            <div className="space-y-2 ml-8">
                              {section.lessons?.map(
                                (lesson: any, lidx: number) => (
                                  <div
                                    key={lesson.id || lidx}
                                    className="flex items-center gap-3 text-sm p-2 hover:bg-muted rounded-md cursor-pointer"
                                  >
                                    <Video
                                      size={14}
                                      className="text-muted-foreground"
                                    />
                                    <span>{lesson.title}</span>
                                    <span className="ml-auto text-xs text-muted-foreground">
                                      {lesson.duration}
                                    </span>
                                  </div>
                                ),
                              )}

                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full mt-2 border border-dashed border-border gap-2"
                              >
                                <Plus size={14} />
                                <span>Add Lesson</span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ),
                    )
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No curriculum available
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="pricing">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                      <div>
                        <p className="font-bold text-lg">
                          $
                          {selectedCourseDetail?.price || selectedCourse?.price}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Standard License
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Promotions & Coupons</h4>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Enter coupon code" />
                        <Button variant="outline">Create</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
