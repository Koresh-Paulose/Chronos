import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import type { EnergyLevel } from '@/types';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'warn' | 'info' | 'danger' | 'neutral' | 'energy';
  energy?: EnergyLevel;
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', energy, size = 'md', dot = false, className, children, ...props }, ref) => {
    const variantStyles = {
      primary: 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20',
      warn: 'bg-accent-warn/10 text-accent-warn border border-accent-warn/20',
      info: 'bg-accent-info/10 text-accent-info border border-accent-info/20',
      danger: 'bg-accent-danger/10 text-accent-danger border border-accent-danger/20',
      neutral: 'bg-border-subtle text-text-secondary border border-border-glow',
      energy: energy
        ? {
            high: 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20',
            medium: 'bg-accent-warn/10 text-accent-warn border border-accent-warn/20',
            low: 'bg-accent-info/10 text-accent-info border border-accent-info/20'
          }[energy]
        : 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20'
    };

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-xs',
      lg: 'px-3 py-1.5 text-sm'
    };

    const resolvedVariant = variant === 'energy' && energy ? variantStyles.energy : variantStyles[variant];

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 font-medium rounded-full border',
          resolvedVariant,
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'rounded-full',
              size === 'sm' && 'h-1.5 w-1.5',
              size === 'md' && 'h-2 w-2',
              size === 'lg' && 'h-2.5 w-2.5',
              energy
                ? {
                    high: 'bg-accent-primary',
                    medium: 'bg-accent-warn',
                    low: 'bg-accent-info'
                  }[energy]
                : 'bg-accent-primary'
            )}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export interface EnergyBadgeProps extends Omit<BadgeProps, 'variant' | 'energy'> {
  energy: EnergyLevel;
  showLabel?: boolean;
}

export const EnergyBadge = forwardRef<HTMLSpanElement, EnergyBadgeProps>(
  ({ energy, showLabel = true, size = 'md', className, ...props }, ref) => {
    const labels: Record<EnergyLevel, string> = {
      high: 'High',
      medium: 'Med',
      low: 'Low'
    };

    return (
      <Badge
        ref={ref}
        variant="energy"
        energy={energy}
        size={size}
        dot={true}
        className={className}
        {...props}
      >
        {showLabel && labels[energy]}
      </Badge>
    );
  }
);

EnergyBadge.displayName = 'EnergyBadge';