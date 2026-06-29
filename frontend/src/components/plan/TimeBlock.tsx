import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge, EnergyBadge } from '@/components/ui/Badge';
import { MicroStepRow } from '@/components/ui/MicroStepRow';
import type { TimeBlock as TimeBlockType, MicroStep } from '@/types';

interface TimeBlockProps extends HTMLAttributes<HTMLDivElement> {
  block: TimeBlockType;
  activeStepId?: string | null;
  completedStepIds?: Set<string>;
  onLaunchStep: (step: MicroStep) => void;
  onCompleteStep: (stepId: string) => void;
  onReopenStep: (stepId: string) => void;
  className?: string;
}

export const TimeBlock = forwardRef<HTMLDivElement, TimeBlockProps>(
  ({
    block,
    activeStepId,
    completedStepIds = new Set(),
    onLaunchStep,
    onCompleteStep,
    onReopenStep,
    className,
    ...props
  }, ref) => {
    const energyColors: Record<TimeBlockType['energy_level'], string> = {
      high: 'accent-primary',
      medium: 'accent-warn',
      low: 'accent-info'
    };

    const energyColor = energyColors[block.energy_level];

    const formatTimeRange = (start: string, end: string) => {
      const startTime = new Date(`2000-01-01T${start}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
      const endTime = new Date(`2000-01-01T${end}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
      return `${startTime} – ${endTime}`;
    };

    return (
      <Card
        ref={ref}
        variant="glass"
        className={cn(
          'border-l-4 transition-all duration-smooth',
          `border-l-${energyColor}`,
          className
        )}
        {...props}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="font-mono text-lg text-text-primary whitespace-nowrap">
                {formatTimeRange(block.start_time, block.end_time)}
              </span>
              <EnergyBadge energy={block.energy_level} size="sm" />
            </div>
            <h3 className="font-display font-semibold text-text-primary">{block.task_title}</h3>
          </div>
          {block.task_summary && (
            <p className="text-sm text-text-secondary mt-2">{block.task_summary}</p>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          <ol className="space-y-3" role="list" aria-label={`${block.task_title} steps`}>
            {block.steps.map((step, index) => (
              <MicroStepRow
                key={step.id}
                step={step}
                index={index}
                isActive={activeStepId === step.id}
                isCompleted={completedStepIds.has(step.id)}
                onLaunch={onLaunchStep}
                onComplete={onCompleteStep}
                onReopen={onReopenStep}
                showDragHandle={false}
              />
            ))}
          </ol>
        </CardContent>
      </Card>
    );
  }
);

TimeBlock.displayName = 'TimeBlock';