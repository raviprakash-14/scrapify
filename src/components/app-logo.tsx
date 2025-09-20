import { Recycle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Recycle className="h-6 w-6 text-primary" />
      <h1 className="text-xl font-bold tracking-tighter text-foreground">Scrapify</h1>
    </div>
  );
}
