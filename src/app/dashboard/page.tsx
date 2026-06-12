"use client";

import React from "react";
import {
  TrendingUp,
  Users as UsersIcon,
  CreditCard,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui";
import { cn } from "../../lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const kpiData = [
  {
    label: "Total Revenue",
    value: "$128,430",
    trend: "+12.5%",
    isPositive: true,
    icon: CreditCard,
    color: "bg-primary",
  },
  {
    label: "Total Users",
    value: "4,321",
    trend: "+8.2%",
    isPositive: true,
    icon: UsersIcon,
    color: "bg-blue-500",
  },
  {
    label: "Active Subs",
    value: "1,240",
    trend: "-2.4%",
    isPositive: false,
    icon: Target,
    color: "bg-emerald-500",
  },
  {
    label: "Conversion",
    value: "3.4%",
    trend: "+1.2%",
    isPositive: true,
    icon: TrendingUp,
    color: "bg-amber-500",
  },
];

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
  { name: "Jul", revenue: 7000 },
];

const growthData = [
  { name: "Mon", users: 120 },
  { name: "Tue", users: 150 },
  { name: "Wed", users: 180 },
  { name: "Thu", users: 140 },
  { name: "Fri", users: 210 },
  { name: "Sat", users: 250 },
  { name: "Sun", users: 190 },
];

const topCourses = [
  {
    id: 1,
    name: "Advanced React Patterns",
    sales: 432,
    revenue: "$21,600",
    rating: 4.9,
  },
  {
    id: 2,
    name: "UI/UX Design Masterclass",
    sales: 385,
    revenue: "$19,250",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Node.js Backend Architecture",
    sales: 312,
    revenue: "$15,600",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Digital Marketing Fundamentals",
    sales: 289,
    revenue: "$14,450",
    rating: 4.6,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Business Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, Alex. Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar size={18} />
            <span>Last 30 Days</span>
          </Button>
          <Button className="gap-2">
            <span>Download Report</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, idx) => (
          <Card
            key={idx}
            className="border-none shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-white",
                    kpi.color,
                  )}
                >
                  <kpi.icon size={22} />
                </div>
                <Badge
                  variant={kpi.isPositive ? "success" : "destructive"}
                  className="gap-1 px-2 py-0.5"
                >
                  {kpi.isPositive ? (
                    <ArrowUpRight size={12} />
                  ) : (
                    <ArrowDownRight size={12} />
                  )}
                  {kpi.trend}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium">
                  {kpi.label}
                </p>
                <p className="text-2xl font-bold tracking-tight">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <CardTitle className="text-lg font-semibold">
              Revenue Trend
            </CardTitle>
            <Button variant="ghost" size="icon">
              <MoreVertical size={18} />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--card))",
                      color: "hsl(var(--foreground))",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#eab308"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <CardTitle className="text-lg font-semibold">User Growth</CardTitle>
            <Button variant="ghost" size="icon">
              <MoreVertical size={18} />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--card))",
                      color: "hsl(var(--foreground))",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                    }}
                    cursor={{ fill: "hsl(var(--muted))" }}
                  />
                  <Bar dataKey="users" radius={[4, 4, 0, 0]}>
                    {growthData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 5 ? "#eab308" : "hsl(var(--muted))"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="col-span-1 xl:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Top Performing Courses
            </CardTitle>
            <Button variant="ghost" className="text-primary p-0">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell>{course.sales}</TableCell>
                    <TableCell>{course.revenue}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500 font-bold">★</span>
                        <span>{course.rating}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <UsersIcon size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New student enrolled</p>
                    <p className="text-xs text-muted-foreground">
                      Sarah Jenkins joined &quot;Advanced React Patterns&quot;
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      2 minutes ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
