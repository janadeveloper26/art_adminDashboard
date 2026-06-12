"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  CheckCircle2,
  MoreVertical,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import {
  Button,
  Input,
  Card,
  CardContent,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui";

export interface UserItem {
  id: number | string;
  email: string;
  first_name?: string;
  last_name?: string;
  date_joined?: string;
  is_approved: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [approvingId, setApprovingId] = useState<number | string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ?? "http://192.168.29.72:8000/api/v1";

  const getHeaders = () => {
    const token = localStorage.getItem("access_token");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/users/list`, {
        headers: getHeaders(),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await res.json();
      setUsers(data.results || data || []);
    } catch (err) {
      console.error(err);
      setError("Could not load users. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (id: number | string) => {
    try {
      setApprovingId(id);
      const res = await fetch(`${API_BASE}/users/${id}/approve/`, {
        method: "PATCH",
        headers: getHeaders(),
      });

      if (!res.ok) throw new Error("Failed to approve user");

      // Update local state
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, is_approved: true } : u)),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to approve user.");
    } finally {
      setApprovingId(null);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Users size={24} className="text-primary" />
            User Management
          </h1>
          <p className="text-muted-foreground mt-1">
            View registered users and manage account approvals.
          </p>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input
              placeholder="Search users by email..."
              className="pl-10 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchUsers}>
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3">
          <ShieldAlert size={18} />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <div className="rounded-xl border border-border bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2
                    className="animate-spin text-primary mx-auto"
                    size={24}
                  />
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>
                    {user.first_name || user.last_name
                      ? `${user.first_name || ""} ${user.last_name || ""}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {user.date_joined
                      ? new Date(user.date_joined).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.is_approved ? "success" : "secondary"}
                      className="text-xs"
                    >
                      {user.is_approved ? "Approved" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      {!user.is_approved && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1 border-primary/20 text-primary hover:bg-primary/5"
                          disabled={approvingId === user.id}
                          onClick={() => handleApprove(user.id)}
                        >
                          {approvingId === user.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <CheckCircle2 size={14} />
                          )}
                          Approve
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
