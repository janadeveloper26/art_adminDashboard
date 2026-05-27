"use client";

import React, { useState } from "react";
import { cn } from "../lib/utils";
import {
  Search,
  Filter,
  MoreVertical,
  User,
  Mail,
  CreditCard,
  Smartphone,
  Ban,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  History,
  Activity,
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
  Switch,
} from "./ui";

const userData = [
  {
    id: 1,
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    sub: "Premium",
    devices: 2,
    status: "Active",
    joined: "2024-01-15",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@example.com",
    sub: "Basic",
    devices: 1,
    status: "Active",
    joined: "2024-02-02",
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.w@example.com",
    sub: "None",
    devices: 0,
    status: "Inactive",
    joined: "2024-03-10",
  },
  {
    id: 4,
    name: "David Miller",
    email: "d.miller@example.com",
    sub: "Premium",
    devices: 5,
    status: "Flagged",
    joined: "2023-11-20",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.t@example.com",
    sub: "Basic",
    devices: 2,
    status: "Active",
    joined: "2024-04-05",
  },
  {
    id: 6,
    name: "James Rodriguez",
    email: "j.rodriguez@example.com",
    sub: "Premium",
    devices: 1,
    status: "Active",
    joined: "2024-01-30",
  },
  {
    id: 7,
    name: "Sophie Brown",
    email: "sophie.b@example.com",
    sub: "Premium",
    devices: 8,
    status: "Flagged",
    joined: "2023-12-15",
  },
];

export function Users() {
  const [selectedUser, setSelectedUser] = useState<(typeof userData)[0] | null>(
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleUserClick = (user: (typeof userData)[0]) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage student accounts, permissions, and security.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Mail size={18} />
            <span>Message All</span>
          </Button>
          <Button className="gap-2">
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input
              placeholder="Search by name, email, or user ID..."
              className="pl-10 h-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Filter size={18} />
              <span>Subscription</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <span>Status</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead>User</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Devices</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleUserClick(user)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary font-bold shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.sub === "Premium" ? "default" : "secondary"}
                  >
                    {user.sub}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div
                    className={cn(
                      "flex items-center gap-1.5",
                      user.devices > 4
                        ? "text-destructive font-bold"
                        : "text-foreground",
                    )}
                  >
                    <Smartphone size={14} />
                    <span>{user.devices}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "Active"
                        ? "success"
                        : user.status === "Flagged"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {user.joined}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        /* ban logic */
                      }}
                    >
                      <Ban size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                    >
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* User Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-w-2xl">
          <DrawerHeader className="border-b pb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                {selectedUser?.name.charAt(0)}
              </div>
              <div className="flex-1">
                <DrawerTitle className="text-2xl">
                  {selectedUser?.name}
                </DrawerTitle>
                <DrawerDescription className="flex items-center gap-2 mt-1">
                  <Mail size={14} /> {selectedUser?.email}
                </DrawerDescription>
              </div>
              <Badge
                variant={
                  selectedUser?.status === "Active" ? "success" : "destructive"
                }
              >
                {selectedUser?.status}
              </Badge>
            </div>

            <div className="flex gap-3">
              <Button size="sm" variant="destructive" className="flex-1 gap-2">
                <Ban size={16} />
                Ban User
              </Button>
              <Button size="sm" variant="outline" className="flex-1 gap-2">
                <RotateCcw size={16} />
                Reset Pass
              </Button>
              <Button size="sm" variant="secondary" className="px-3">
                <ExternalLink size={16} />
              </Button>
            </div>
          </DrawerHeader>

          <div className="py-6 overflow-hidden flex flex-col h-full">
            <Tabs defaultValue="info" className="flex-1 flex flex-col">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
                <TabsTrigger
                  value="info"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                >
                  Profile Info
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                >
                  Activity Log
                </TabsTrigger>
                <TabsTrigger
                  value="devices"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                >
                  Devices
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="info"
                className="space-y-8 overflow-y-auto pr-2"
              >
                <div className="grid grid-cols-2 gap-6">
                  <Card className="p-4 border-none bg-slate-50 shadow-none">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                      Subscription
                    </p>
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="text-primary" />
                      <span className="font-bold">
                        {selectedUser?.sub} Plan
                      </span>
                    </div>
                  </Card>
                  <Card className="p-4 border-none bg-slate-50 shadow-none">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                      Customer Since
                    </p>
                    <div className="flex items-center gap-2">
                      <History size={16} className="text-primary" />
                      <span className="font-bold">{selectedUser?.joined}</span>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-sm">
                    Security & Permissions
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="text-sm font-medium">
                          Multi-device streaming
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Allow user to watch on multiple devices
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="text-sm font-medium">Download access</p>
                        <p className="text-xs text-muted-foreground">
                          Enable offline viewing for mobile
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full text-destructive hover:bg-destructive/5 hover:text-destructive gap-2"
                  >
                    <RotateCcw size={16} />
                    Issue Subscription Refund
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex gap-3 pb-4 border-b last:border-0"
                  >
                    <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center shrink-0">
                      <Activity size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Watched: Introduction to Hooks
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Completed 12m 45s • Today at 2:30 PM
                      </p>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="devices">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-xl border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <Smartphone
                          size={20}
                          className="text-muted-foreground"
                        />
                        <div>
                          <p className="text-sm font-semibold">
                            iPhone 15 Pro Max
                          </p>
                          <p className="text-[10px] text-muted-foreground uppercase">
                            Last Active: 2h ago • New York, US
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive text-xs"
                      >
                        Unlink
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
