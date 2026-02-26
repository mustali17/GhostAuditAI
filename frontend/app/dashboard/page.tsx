"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import StatsOverview from "@/components/dashboard/StatsOverview";
import AuditList from "@/components/dashboard/AuditList";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalFiles: 0,
    avgAiScore: 0,
    cleanDocs: 0,
  });
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [statsRes, auditsRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`, {
          headers,
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/recent`, {
          headers,
        }),
      ]);

      setStats(statsRes.data);
      setAudits(auditsRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll every 5 seconds for updates
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button
          size="sm"
          variant="outline"
          onClick={() => fetchData()}
          className="gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <StatsOverview stats={stats} loading={loading} />

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Recent Audits</h2>
        <AuditList audits={audits} loading={loading} />
      </div>
    </div>
  );
}
