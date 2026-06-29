import React, { forwardRef, type HTMLAttributes, useId, useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: React.ReactNode;
  children: React.ReactElement<any>;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

const positionStyles = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2'
};

const arrowStyles = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-accent-primary',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-accent-primary',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-accent-primary',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-accent-primary'
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, position = 'top', delay = 200, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const tooltipId = useId();

    const show = () => {
      timeoutRef.current = setTimeout(() => setVisible(true), delay);
    };

    const hide = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setVisible(false);
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    if (!React.isValidElement(children)) {
      throw new Error('Tooltip children must be a single React element');
    }

    const childProps = children.props as Record<string, any>;

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex', className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        {...props}
      >
        {React.cloneElement(children as any, {
          ...childProps,
          'aria-describedby': visible ? tooltipId : undefined
        })}
        {visible && (
          <div
            id={tooltipId}
            role="tooltip"
            className={cn(
              'absolute z-50 glass px-3 py-2 text-sm text-text-primary whitespace-nowrap rounded-lg shadow-glow animate-fade-in',
              'pointer-events-none',
              positionStyles[position]
            )}
            aria-hidden="true"
          >
            {content}
            <div
              className={cn(
                'absolute w-0 h-0 border-4 border-transparent',
                arrowStyles[position]
              )}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
