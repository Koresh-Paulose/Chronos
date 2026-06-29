import { forwardRef, type HTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { X, Trash2 } from 'lucide-react';
import type { RejectedTask } from '@/types';

interface RejectedTasksModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  rejectedTasks: RejectedTask[];
  onDismiss: (taskId: string) => void;
  className?: string;
}

export const RejectedTasksModal = forwardRef<HTMLDivElement, RejectedTasksModalProps>(
  ({ isOpen, onClose, rejectedTasks, onDismiss, className, ...props }, ref) => {
    const [dismissing, setDismissing] = useState<string | null>(null);

    const energyColors: Record<RejectedTask['energy_level'], string> = {
      high: 'accent-primary',
      medium: 'accent-warn',
      low: 'accent-info'
    };

    const formatDuration = (minutes: number) => {
      if (minutes < 60) return `${minutes}m`;
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    };

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Rejected Tasks"
        description={`${rejectedTasks.length} tasks were not included in your plan`}
        size="lg"
        className={className}
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {rejectedTasks.length === 0 ? (
            <div className="text-center py-12">
              <X className="h-12 w-12 text-text-muted mx-auto mb-4" aria-hidden="true" />
              <p className="text-text-secondary">No rejected tasks</p>
            </div>
          ) : (
            rejectedTasks.map((task) => {
              const energyColor = energyColors[task.energy_level];
              return (
                <div
                  key={task.id}
                  className={cn(
                    'glass rounded-xl p-4 flex items-start gap-4 transition-opacity',
                    dismissing === task.id && 'opacity-50 animate-fade-out'
                  )}
                >
                  <div className={cn('flex-shrink-0 w-2 h-2 rounded-full mt-2', `bg-${energyColor}`)} aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-text-primary truncate">{task.title}</h4>
                      <span className={cn('badge px-2 py-0.5 text-xs', `bg-${energyColor}/10 text-${energyColor} border-${energyColor}/20`)}>
                        {task.energy_level}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">{task.reason}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `var(--accent-${energyColor.replace('accent-', '')})` }} aria-hidden="true" />
                        {formatDuration(task.estimated_minutes)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setDismissing(task.id);
                      onDismiss(task.id);
                    }}
                    disabled={dismissing === task.id}
                    aria-label={`Dismiss ${task.title}`}
                    className="text-text-muted hover:text-accent-danger"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </Modal>
    );
  }
);

RejectedTasksModal.displayName = 'RejectedTasksModal';