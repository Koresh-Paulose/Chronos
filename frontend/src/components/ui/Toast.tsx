import { forwardRef, type HTMLAttributes, useId, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info';
  action?: React.ReactNode;
  duration?: number;
  onClose?: () => void;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ title, description, variant = 'default', action, duration = 5000, onClose, className, ...props }, ref) => {
    const [visible, setVisible] = useState(true);
    const id = useId();

    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          setVisible(false);
          onClose?.();
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, onClose]);

    if (!visible) return null;

    const variantStyles = {
      default: 'bg-bg-card border-border-subtle',
      success: 'bg-accent-primary/10 border-accent-primary/20',
      danger: 'bg-accent-danger/10 border-accent-danger/20',
      warning: 'bg-accent-warn/10 border-accent-warn/20',
      info: 'bg-accent-info/10 border-accent-info/20'
    };

    const iconStyles = {
      default: 'text-text-secondary',
      success: 'text-accent-primary',
      danger: 'text-accent-danger',
      warning: 'text-accent-warn',
      info: 'text-accent-info'
    };

    const icons = {
      default: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      success: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      danger: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      warning: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      info: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };

    return (
      <div
        ref={ref}
        id={id}
        role="alert"
        aria-live="polite"
        className={cn(
          'glass rounded-xl p-4 gap-3 animate-slide-in max-w-sm w-full',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className={cn('flex-shrink-0', iconStyles[variant])} aria-hidden="true">
          {icons[variant]}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-medium text-text-primary">{title}</p>
          )}
          {description && (
            <p className="text-sm text-text-secondary mt-0.5">{description}</p>
          )}
        </div>
        {action && (
          <div className="flex-shrink-0 mt-0.5">{action}</div>
        )}
        <button
          onClick={() => { setVisible(false); onClose?.(); }}
          className="flex-shrink-0 p-1 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-bg-card"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    );
  }
);

Toast.displayName = 'Toast';

interface ToasterProps {
  toasts: Array<ToastProps & { id: string }>;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const positionStyles = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
};

export function Toaster({ toasts, position = 'top-right' }: ToasterProps) {
  return (
    <div
      className={cn(
        'fixed z-[100] flex flex-col gap-2 pointer-events-none',
        positionStyles[position]
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full max-w-sm">
          <Toast {...toast} />
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);

  const toast = ({ id = Math.random().toString(36).slice(2), onClose, ...props }: ToastProps & { id?: string }) => {
    setToasts((prev) => [...prev, { ...props, id, onClose: () => { setToasts((t) => t.filter((x) => x.id !== id)); onClose?.(); } }]);
    return id;
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toast, dismiss, toasts, Toaster };
}