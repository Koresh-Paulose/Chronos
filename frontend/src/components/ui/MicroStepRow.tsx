import { forwardRef, type HTMLAttributes, useId } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Tooltip } from './Tooltip';
import { TimerDisplay } from './TimerDisplay';
import { ExternalLink, GripVertical, Play, Check, X, Clock } from 'lucide-react';
import type { MicroStep } from '@/types';

interface MicroStepRowProps extends HTMLAttributes<HTMLDivElement> {
  step: MicroStep;
  index: number;
  isActive?: boolean;
  isCompleted?: boolean;
  onLaunch: (step: MicroStep) => void;
  onComplete?: (stepId: string) => void;
  onReopen?: (stepId: string) => void;
  showDragHandle?: boolean;
  className?: string;
}

export const MicroStepRow = forwardRef<HTMLDivElement, MicroStepRowProps>(
  ({
    step,
    index,
    isActive = false,
    isCompleted = false,
    onLaunch,
    onComplete,
    onReopen,
    showDragHandle = false,
    className,
    ...props
  }, ref) => {
    const rowId = useId();

    const energyColors: Record<MicroStep['energy_cost'], string> = {
      high: 'accent-primary',
      medium: 'accent-warn',
      low: 'accent-info'
    };

    const energyColor = energyColors[step.energy_cost];

    const handleLaunch = () => {
      if (!isCompleted) {
        onLaunch(step);
      }
    };

    const handleComplete = () => {
      if (onComplete && !isCompleted) {
        onComplete(step.id);
      }
    };

    const handleReopen = () => {
      if (onReopen && isCompleted) {
        onReopen(step.id);
      }
    };

    const launchButtonText = isCompleted ? 'Done' : (isActive ? 'Active' : 'Launch');
    const launchButtonVariant = isCompleted ? 'success' : (isActive ? 'primary' : 'primary');

    return (
      <div
        ref={ref}
        id={rowId}
        className={cn(
          'group relative flex items-center gap-3 p-4 glass rounded-xl transition-all duration-smooth',
          'border border-border-subtle',
          isActive && 'border-accent-primary/50 bg-accent-primary/5 shadow-glow',
          isCompleted && 'opacity-60 border-border-subtle',
          showDragHandle && 'pl-12',
          className
        )}
        {...props}
      >
        {showDragHandle && (
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Drag to reorder"
            aria-grabbed="false"
          >
            <GripVertical className="h-5 w-5" aria-hidden="true" />
          </button>
        )}

        <span className={cn('flex-shrink-0 w-8 text-center font-mono text-text-muted', isCompleted && 'text-accent-primary')}>
          {index + 1}.
        </span>

        <div className="flex-1 min-w-0">
          <p className={cn(
            'font-body text-text-primary break-words transition-colors',
            isCompleted && 'line-through text-text-muted'
          )}>
            {step.text}
          </p>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className={cn(
              'badge px-2 py-0.5 text-xs font-mono',
              `bg-${energyColor}/10 text-${energyColor} border-${energyColor}/20`
            )}>
              {step.duration_min}m
            </span>
            {step.reason && (
              <Tooltip content={step.reason} position="top">
                <span className="flex items-center gap-1 text-xs text-text-muted cursor-help" aria-label={step.reason}>
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  <span>Why</span>
                </span>
              </Tooltip>
            )}
            {step.target_url && (
              <a
                href={step.target_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-accent-primary hover:text-accent-primary-dim transition-colors"
                aria-label={`Open link: ${step.target_url}`}
              >
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                <span>Link</span>
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {isCompleted ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReopen}
                aria-label="Mark as incomplete"
                className="text-accent-primary hover:text-accent-primary-dim"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </>
          ) : isActive ? (
            <>
              <TimerDisplay totalSeconds={step.duration_min * 60} size="sm" showLabel={false} />
              <Button
                variant="danger"
                size="sm"
                onClick={handleComplete}
                aria-label="Finish early"
                className="whitespace-nowrap"
              >
                Finish
              </Button>
            </>
          ) : (
            <Button
              variant={launchButtonVariant}
              size="lg"
              onClick={handleLaunch}
              disabled={isCompleted}
              leftIcon={<Play className="h-4 w-4" aria-hidden="true" />}
              className="whitespace-nowrap"
              aria-label={launchButtonText}
            >
              {launchButtonText}
            </Button>
          )}
        </div>
      </div>
    );
  }
);

MicroStepRow.displayName = 'MicroStepRow';