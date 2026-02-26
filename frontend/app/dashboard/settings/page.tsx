"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            withCredentials: true,
          },
        );
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading)
    return <div className="text-muted-foreground">Loading settings...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-muted">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger
            value="billing"
            onClick={() => router.push("/dashboard/settings/billing")}
          >
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" /> Profile Information
              </CardTitle>
              <CardDescription>
                Manage your public profile details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Name
                </label>
                <div className="p-2 rounded-md border border-input bg-background/50 text-foreground">
                  {user?.name}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Email
                </label>
                <div className="p-2 rounded-md border border-input bg-background/50 text-foreground">
                  {user?.email}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Organization
                </label>
                <div className="p-2 rounded-md border border-input bg-background/50 text-foreground">
                  {user?.organizationId ? "Joined" : "None"}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
