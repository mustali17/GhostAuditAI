import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuditHeaderProps {
  auditId: string;
  fileName: string;
  status: string;
  aiScore: number;
}

import axios from "axios";

export default function AuditHeader({
  auditId,
  fileName,
  status,
  aiScore,
}: AuditHeaderProps) {
  const handleExport = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/audit/${auditId}/pdf`,
        {
          withCredentials: true,
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Report-${fileName}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Failed to export PDF", error);
      alert("Failed to generate report");
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-border pb-4">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold">{fileName}</h1>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>
              Status:{" "}
              <span
                className={
                  status === "COMPLETED" ? "text-green-500" : "text-yellow-500"
                }
              >
                {status}
              </span>
            </span>
            <span>•</span>
            <span>
              AI Probability:{" "}
              <span
                className={aiScore > 50 ? "text-red-500" : "text-green-500"}
              >
                {aiScore}%
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          onClick={handleExport}
          variant="outline"
          className="text-muted-foreground border-border hover:bg-muted"
        >
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>
    </div>
  );
}
