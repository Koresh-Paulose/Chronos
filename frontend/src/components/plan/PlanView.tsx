import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PlanViewProps {
  children: ReactNode;
  className?: string;
}

export function PlanView({ children, className }: PlanViewProps) {
  return (
    <main className={cn('flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8', className)}>
      <div className="mx-auto max-w-4xl">{children}</div>
    </main>
  );
}