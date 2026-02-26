"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CheckCircle,
  AlertCircle,
  Folder,
  RefreshCw,
  HardDrive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

export default function IntegrationsPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [folders, setFolders] = useState<DriveFile[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const token = localStorage.getItem("token");
      // Temporary workaround: Try to fetch files. If success, we are connected.
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/google/files`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setIsConnected(true);
      setFolders(response.data);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const handleConnect = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/google/auth-url`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Failed to get auth url", error);
      alert("Could not start Google Authentication");
    }
  };

  const handleSelectFolder = async (folderId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/google/watchfolder`,
        { folderId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSelectedFolder(folderId);
      alert("Watchfolder updated successfully!");
    } catch (error) {
      console.error("Failed to set watchfolder", error);
    }
  };

  const handleSync = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/google/sync`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Failed to sync", error);
      alert("Sync failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">
          Manage your external connections and data sources.
        </p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <HardDrive className="h-6 w-6 text-primary" />
                <span>Google Drive</span>
                {isConnected && (
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-green-500/10 text-green-600 hover:bg-green-500/20"
                  >
                    Connected
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Connect your Google Drive to automatically sync and audit
                documents.
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSync}
                    disabled={loading}
                    variant="outline"
                    size="sm"
                  >
                    <RefreshCw
                      className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
                    />
                    {loading ? "Syncing..." : "Sync Now"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground cursor-default hover:bg-transparent"
                  >
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Linked
                  </Button>
                </div>
              ) : (
                <Button onClick={handleConnect} variant="default">
                  Connect Drive
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        {isConnected && (
          <CardContent className="space-y-6 pt-0">
            <div className="space-y-3">
              <Label className="text-base font-medium">
                Select Watchfolder
              </Label>
              <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
                {folders.length > 0 ? (
                  folders.map((folder) => (
                    <div
                      key={folder.id}
                      onClick={() => handleSelectFolder(folder.id)}
                      className={`flex items-center justify-between rounded-md border p-3 cursor-pointer transition-all hover:shadow-sm ${
                        selectedFolder === folder.id
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${selectedFolder === folder.id ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
                        >
                          <Folder className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{folder.name}</span>
                      </div>
                      {selectedFolder === folder.id && (
                        <CheckCircle className="text-primary h-5 w-5" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-lg">
                    <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      No folders found in your Google Drive.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
