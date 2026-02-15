import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText, ArrowUpRight, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface AuditResult {
  _id: string;
  fileName: string;
  aiScore: number;
  plagiarismScore: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
}

interface AuditListProps {
  audits: AuditResult[];
  loading: boolean;
  title?: string;
}

export default function AuditList({ audits, loading, title }: AuditListProps) {
  if (loading) {
    return (
        <Card className="bg-card/40 border border-border/40 backdrop-blur-sm">
            <CardHeader><div className="h-6 w-32 bg-muted rounded animate-pulse" /></CardHeader>
            <CardContent className="space-y-4">
                {[1,2,3].map(i => <div key={i} className="h-12 w-full bg-muted/50 rounded animate-pulse" />)}
            </CardContent>
        </Card>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'FAILED': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <Card className="glass-card shadow-sm overflow-hidden">
      {title && (
        <CardHeader className="border-b border-border/10 p-6 bg-muted/5">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 tracking-tight">
                <FileText className="h-5 w-5 text-primary" />
                {title}
            </CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <Table>
            <TableHeader>
            <TableRow className="border-border/10 hover:bg-muted/5">
                <TableHead className="w-[40%] text-xs uppercase tracking-wider text-muted-foreground font-medium pl-6">File Name</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Status</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-medium">AI Probability</TableHead>
                <TableHead className="text-right text-xs uppercase tracking-wider text-muted-foreground font-medium pr-6">Date</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {audits.length === 0 ? (
                <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground h-32">
                    <div className="flex flex-col items-center gap-2">
                        <FileText className="h-8 w-8 text-muted-foreground/30" />
                        <p>No audits found. Sync some files to get started!</p>
                    </div>
                </TableCell>
                </TableRow>
            ) : (
                audits.map((audit) => (
                <TableRow key={audit._id} className="border-border/10 hover:bg-muted/5 group transition-colors">
                    <TableCell className="font-medium pl-6">
                        <Link href={`/dashboard/audit/${audit._id}`} className="text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                            <span className="truncate max-w-[200px]">{audit.fileName}</span>
                            <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
                        </Link>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            {getStatusIcon(audit.status)}
                            <span className={`text-xs font-medium ${
                                audit.status === 'COMPLETED' ? 'text-green-500' : 
                                audit.status === 'FAILED' ? 'text-red-500' : 'text-yellow-500'
                            }`}>{audit.status}</span>
                        </div>
                    </TableCell>
                    <TableCell>
                    {audit.status === 'COMPLETED' ? (
                        <div className="flex items-center space-x-3">
                            <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden border border-border/10">
                                <div 
                                    className={`h-full rounded-full ${audit.aiScore > 50 ? 'bg-red-500' : 'bg-green-500'}`} 
                                    style={{ width: `${audit.aiScore}%` }}
                                />
                            </div>
                            <span className={`text-xs font-mono tabular-nums ${audit.aiScore > 50 ? 'text-red-500' : 'text-green-500'}`}>{audit.aiScore}%</span>
                        </div>
                    ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                    )}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-xs font-mono pr-6">
                    {new Date(audit.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </TableCell>
                </TableRow>
                ))
            )}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
