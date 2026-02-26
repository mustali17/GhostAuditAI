"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AuditList from "@/components/dashboard/AuditList";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AuditsPage() {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAudits = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/audits?page=${pageNum}&limit=10`,
        {
          withCredentials: true,
        },
      );
      setAudits(response.data.audits);
      setTotalPages(response.data.totalPages);
      setPage(response.data.page);
    } catch (error) {
      console.error("Failed to fetch audits", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudits(page);
  }, [page]);

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">My Audits</h1>

      {loading ? (
        <div className="text-muted-foreground">Loading audits...</div>
      ) : (
        <>
          <AuditList audits={audits} loading={loading} title="All Audits" />

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-4 items-center">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={page === totalPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
