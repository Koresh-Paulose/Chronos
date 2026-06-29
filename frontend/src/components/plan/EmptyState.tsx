import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Zap, Target, Clock, Brain } from 'lucide-react';

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  onGeneratePlan: () => void;
  className?: string;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ onGeneratePlan, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center min-h-[50vh] px-4 text-center',
        className
      )}
      {...props}
    >
      <div className="mb-8 animate-fade-in">
        <div className="mx-auto mb-6 w-24 h-24 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
          <Zap className="h-12 w-12 text-accent-primary" aria-hidden="true" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
          No Battle Plan Yet
        </h2>
        <p className="text-text-secondary max-w-md mx-auto leading-relaxed">
          Chronos uses Adversarial Planning to break your tasks into micro-commitments
          you can't ignore. Generate your first plan to get started.
        </p>
      </div>

      <div className="w-full max-w-md space-y-4 animate-slide-in">
        <Button
          variant="primary"
          size="lg"
          onClick={onGeneratePlan}
          className="w-full"
          leftIcon={<Target className="h-5 w-5" aria-hidden="true" />}
        >
          Generate Your First Battle Plan
        </Button>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 glass rounded-xl">
            <Clock className="h-6 w-6 text-accent-info mx-auto mb-2" aria-hidden="true" />
            <p className="text-xs font-medium text-text-primary">Time-Blocked</p>
            <p className="text-xs text-text-muted">Aligned to energy</p>
          </div>
          <div className="p-4 glass rounded-xl">
            <Brain className="h-6 w-6 text-accent-warn mx-auto mb-2" aria-hidden="true" />
            <p className="text-xs font-medium text-text-primary">Micro-Steps</p>
            <p className="text-xs text-text-muted">5-15 min each</p>
          </div>
          <div className="p-4 glass rounded-xl">
            <Zap className="h-6 w-6 text-accent-primary mx-auto mb-2" aria-hidden="true" />
            <p className="text-xs font-medium text-text-primary">Force Action</p>
            <p className="text-xs text-text-muted">Focus mode built-in</p>
          </div>
        </div>
      </div>
    </div>
  )
);

EmptyState.displayName = 'EmptyState';