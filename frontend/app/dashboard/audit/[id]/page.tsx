'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import AuditHeader from '@/components/audit/AuditHeader';
import AnalysisSidebar from '@/components/audit/AnalysisSidebar';
import DocumentViewer from '@/components/audit/DocumentViewer';

export default function AuditDetailPage() {
  const { id } = useParams();
  const [audit, setAudit] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/audit/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAudit(response.data);
      } catch (error) {
        console.error('Failed to fetch audit', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAudit();
  }, [id]);

  if (loading) return <div className="p-8 text-foreground">Loading audit details...</div>;
  if (!audit) return <div className="p-8 text-foreground">Audit not found</div>;

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col bg-background text-foreground">
      <div className="p-4 border-b border-border">
        <AuditHeader 
            auditId={audit._id}
            fileName={audit.fileName} 
            status={audit.status} 
            aiScore={audit.aiScore} 
        />
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <DocumentViewer 
            text={audit.originalText || "No text content found for this file."} 
            flaggedSentences={audit.flaggedSentences || []} 
        />
        <AnalysisSidebar 
            aiScore={audit.aiScore} 
            plagiarismScore={audit.plagiarismScore} 
            flaggedSentences={audit.flaggedSentences || []} 
        />
      </div>
    </div>
  );
}
