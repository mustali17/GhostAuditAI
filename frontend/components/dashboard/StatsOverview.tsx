import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, FileText, ShieldCheck, Sparkles } from 'lucide-react';

interface StatsOverviewProps {
  stats: {
    totalFiles: number;
    avgAiScore: number;
    cleanDocs: number;
  };
  loading: boolean;
}

export default function StatsOverview({ stats, loading }: StatsOverviewProps) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-xl bg-muted/20 animate-pulse border border-border/40" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Total Scanned - Electric Violet Glow */}
      <div className="group relative rounded-xl glass-card p-6 hover:bg-card/60">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition duration-500 blur-lg"></div>
        <div className="relative flex flex-col justify-between h-full space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Scanned</span>
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                </div>
            </div>
            <div>
                <div className="text-3xl font-mono font-bold tracking-tight text-foreground">{stats.totalFiles}</div>
                <p className="text-xs text-muted-foreground mt-1">Documents processed</p>
            </div>
        </div>
      </div>
      
      {/* AI Score - Dynamic Color */}
      <div className="group relative rounded-xl glass-card p-6 hover:bg-card/60">
        <div className={`absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-20 transition duration-500 blur-lg ${stats.avgAiScore > 50 ? 'bg-red-500' : 'bg-green-500'}`}></div>
        <div className="relative flex flex-col justify-between h-full space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Avg. AI Score</span>
                <div className={`p-2 rounded-lg ${stats.avgAiScore > 50 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                    <Activity className="h-5 w-5" />
                </div>
            </div>
            <div>
                <div className={`text-3xl font-mono font-bold tracking-tight ${stats.avgAiScore > 50 ? 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]'}`}>
                    {stats.avgAiScore}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">Risk probability</p>
            </div>
        </div>
      </div>

      {/* Clean Docs - Emerald Glow */}
      <div className="group relative rounded-xl glass-card p-6 hover:bg-card/60">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-20 transition duration-500 blur-lg"></div>
        <div className="relative flex flex-col justify-between h-full space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Clean Docs</span>
                <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                    <ShieldCheck className="h-5 w-5" />
                </div>
            </div>
            <div>
                <div className="text-3xl font-mono font-bold tracking-tight text-foreground">{stats.cleanDocs}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    Verified human <Sparkles className="h-3 w-3 text-yellow-500" />
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
