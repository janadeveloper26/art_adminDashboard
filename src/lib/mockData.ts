export const MOCK_COURSES = [
  {
    id: "c1",
    title: "React Complete Guide",
    category: "Development",
    price: 49.99,
    status: "Active",
    students: 1205,
    level: "Beginner to Advanced",
    instructor: "John Doe",
    instructor_role: "Senior Software Engineer",
    duration: "12h 30m",
    description: "Master React from basics to advanced patterns. Build real-world applications.",
    curriculum: [
      {
        id: "s1",
        title: "Module 1: Introduction",
        lessons: [
          { id: "l1", title: "What is React?", duration: "10:05", video_url: "dummy.mp4" },
          { id: "l2", title: "Setup Environment", duration: "15:20", video_url: "dummy.mp4" },
        ]
      },
      {
        id: "s2",
        title: "Module 2: Hooks",
        lessons: [
          { id: "l3", title: "useState and useEffect", duration: "20:00", video_url: "dummy.mp4" },
        ]
      }
    ]
  },
  {
    id: "c2",
    title: "Advanced Django Architecture",
    category: "Backend",
    price: 69.99,
    status: "Draft",
    students: 0,
    level: "Advanced",
    instructor: "Jane Smith",
    instructor_role: "Lead Backend Developer",
    duration: "8h 15m",
    description: "Learn how to build scalable Django applications.",
    curriculum: []
  }
];

export const MOCK_CATEGORIES: Array<{
  id: string;
  name: string;
  order?: number;
  slug?: string;
  course_count?: number;
}> = [
  { id: "cat1", name: "Web Development", order: 0, slug: "web-development", course_count: 12 },
  { id: "cat2", name: "Mobile Development", order: 1, slug: "mobile-development", course_count: 8 },
  { id: "cat3", name: "Data Science", order: 2, slug: "data-science", course_count: 15 },
  { id: "cat4", name: "DevOps", order: 3, slug: "devops", course_count: 6 },
  { id: "cat5", name: "Design", order: 4, slug: "design", course_count: 10 },
  { id: "cat6", name: "Business", order: 5, slug: "business", course_count: 4 },
  { id: "cat7", name: "Marketing", order: 6, slug: "marketing", course_count: 7 },
];

export const MOCK_VIDEOS = [
  {
    id: "v1",
    title: "What is React?",
    duration: "10:05",
    status: "Published",
    thumbnail: "https://via.placeholder.com/300x169.png?text=React+Intro",
    views: 520,
    drm: true
  },
  {
    id: "v2",
    title: "Setup Environment",
    duration: "15:20",
    status: "Published",
    thumbnail: "https://via.placeholder.com/300x169.png?text=Setup",
    views: 480,
    drm: true
  },
  {
    id: "v3",
    title: "useState and useEffect",
    duration: "20:00",
    status: "Encoding",
    thumbnail: "https://via.placeholder.com/300x169.png?text=Hooks",
    views: 0,
    drm: false
  }
];
