import { forwardRef, type HTMLAttributes, type ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getColorFromName(name: string): string {
  const colors = [
    'bg-accent-primary/20 text-accent-primary',
    'bg-accent-info/20 text-accent-info',
    'bg-accent-warn/20 text-accent-warn',
    'bg-accent-danger/20 text-accent-danger',
    'bg-purple-500/20 text-purple-400',
    'bg-pink-500/20 text-pink-400',
    'bg-orange-500/20 text-orange-400',
    'bg-cyan-500/20 text-cyan-400'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, name, size = 'md', shape = 'circle', status, className, ...props }, ref) => {
    const sizeStyles = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl'
    };

    const shapeStyles = {
      circle: 'rounded-full',
      square: 'rounded-xl'
    };

    const statusSize = {
      xs: 'h-1.5 w-1.5',
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
      xl: 'h-4 w-4'
    };

    const statusColors = {
      online: 'bg-accent-primary',
      offline: 'bg-text-muted',
      busy: 'bg-accent-danger',
      away: 'bg-accent-warn'
    };

    const hasImage = !!src;

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex shrink-0', className)}
        {...props}
      >
        <div
          className={cn(
            'overflow-hidden bg-border-subtle flex items-center justify-center font-medium',
            sizeStyles[size],
            shapeStyles[shape]
          )}
          role="img"
          aria-label={name || alt || 'User avatar'}
        >
          {hasImage ? (
            <img
              src={src}
              alt={alt || name || 'User avatar'}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : name ? (
            <span className={getColorFromName(name)}>{getInitials(name)}</span>
          ) : (
            <svg
              className="h-full w-full text-text-muted opacity-50"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </div>
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 border-2 border-bg-deep rounded-full',
              statusSize[size],
              statusColors[status]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarProps['size'];
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 5, size = 'md', className, ...props }, ref) => {
    const kids = React.Children.toArray(children);
    const visible = kids.slice(0, max);
    const remaining = kids.length - max;

    return (
      <div ref={ref} className={cn('flex -space-x-2', className)} {...props}>
        {visible.map((child, index) =>
          React.cloneElement(child as React.ReactElement, {
            key: index,
            size,
            className: cn('ring-2 ring-bg-deep', (child as React.ReactElement).props.className)
          })
        )}
        {remaining > 0 && (
          <div
            className={cn(
              'flex items-center justify-center bg-border-subtle text-text-secondary font-medium border-2 border-bg-deep',
              {
                'h-6 w-6 text-xs': size === 'xs',
                'h-8 w-8 text-sm': size === 'sm',
                'h-10 w-10 text-base': size === 'md',
                'h-12 w-12 text-lg': size === 'lg',
                'h-16 w-16 text-xl': size === 'xl'
              }
            )}
            aria-label={`${remaining} more users`}
          >
            +{remaining}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

import React from 'react';