import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, Fingerprint, ShieldAlert } from 'lucide-react';

interface AnalysisSidebarProps {
  aiScore: number;
  plagiarismScore: number;
  flaggedSentences: any[];
}

export default function AnalysisSidebar({
  aiScore,
  plagiarismScore,
  flaggedSentences,
}: AnalysisSidebarProps) {
  return (
    <div className="w-80 border-l border-border bg-card p-4 overflow-y-auto">
      <h2 className="mb-4 text-lg font-bold">Risk Analysis</h2>

      <div className="space-y-4">
        {/* AI Score Card */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{aiScore}%</span>
              {aiScore > 50 ? (
                <Badge variant="destructive" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20">High Risk</Badge>
              ) : (
                <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">Low Risk</Badge>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Probability of AI generation</p>
          </CardContent>
        </Card>

        {/* Plagiarism Score Card */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Plagiarism</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{plagiarismScore}%</span>
              <Badge variant="outline" className="text-muted-foreground">Checked</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="pt-4">
          <h3 className="mb-2 text-sm font-semibold text-foreground">Flagged Issues ({flaggedSentences.length})</h3>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {flaggedSentences.map((issue, index) => (
                <div key={index} className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                  <div className="mb-2 flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-xs font-bold text-red-500">{issue.issueType}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-3">"{issue.text}"</p>
                  {issue.suggestion && (
                    <div className="mt-2 text-xs text-muted-foreground italic">
                      Suggestion: {issue.suggestion}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
