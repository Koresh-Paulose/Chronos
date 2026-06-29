import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface TimerDisplayProps {
  totalSeconds: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  pulseThreshold?: number;
  onComplete?: () => void;
  className?: string;
}

export function TimerDisplay({
  totalSeconds,
  size = 'lg',
  showLabel = true,
  pulseThreshold = 30,
  onComplete,
  className,
}: TimerDisplayProps) {
  const sizeStyles = {
    sm: { ringSize: 4, fontSize: 'text-xl', radius: 32, strokeWidth: 4 },
    md: { ringSize: 6, fontSize: 'text-2xl', radius: 48, strokeWidth: 5 },
    lg: { ringSize: 8, fontSize: 'text-4xl', radius: 64, strokeWidth: 6 },
    xl: { ringSize: 12, fontSize: 'text-6xl', radius: 80, strokeWidth: 8 }
  };

  const { ringSize, fontSize, radius, strokeWidth } = sizeStyles[size];
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, totalSeconds) / Math.max(1, totalSeconds));

  useEffect(() => {
    if (totalSeconds <= 0 && onComplete) {
      onComplete();
    }
  }, [totalSeconds, onComplete]);

  const mins = Math.floor(Math.max(0, totalSeconds) / 60);
  const secs = Math.max(0, totalSeconds) % 60;
  const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const shouldPulse = totalSeconds > 0 && totalSeconds <= pulseThreshold;

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2',
        className
      )}
    >
      <div className="relative" aria-hidden="true">
        <svg
          className={cn(
            'transform -rotate-90',
            shouldPulse && 'animate-pulse text-accent-danger'
          )}
          width={ringSize * 16}
          height={ringSize * 16}
        >
          <circle
            className="text-border-subtle"
            cx={ringSize * 8}
            cy={ringSize * 8}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            className={cn(
              'transition-all duration-300 ease-out',
              'text-accent-primary',
              shouldPulse && 'text-accent-danger'
            )}
            cx={ringSize * 8}
            cy={ringSize * 8}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset
            } as React.CSSProperties}
          />
        </svg>
        <div className={cn(
          'absolute inset-0 flex items-center justify-center',
          fontSize,
          'font-mono font-medium text-text-primary'
        )} aria-hidden="true">
          {timeString}
        </div>
      </div>
      {showLabel && (
        <span className="text-xs text-text-muted font-medium uppercase tracking-wider">
          Remaining
        </span>
      )}
    </div>
  );
}

interface CountdownTimerProps extends Omit<TimerDisplayProps, 'totalSeconds'> {
  durationSeconds: number;
  autoStart?: boolean;
  onTick?: (secondsRemaining: number) => void;
}

export function CountdownTimer({
  durationSeconds,
  autoStart = true,
  onTick,
  ...props
}: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (isRunning && seconds > 0) {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - (startTimeRef.current ?? Date.now())) / 1000);
        const remaining = Math.max(0, durationSeconds - elapsed);
        setSeconds(remaining);
        onTick?.(remaining);
        if (remaining <= 0) {
          setIsRunning(false);
        }
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, durationSeconds, onTick]);

  const pause = () => setIsRunning(false);
  const resume = () => setIsRunning(true);
  const reset = () => {
    setSeconds(durationSeconds);
    setIsRunning(autoStart);
  };

  return (
    <>
      <TimerDisplay totalSeconds={seconds} {...props} />
      <div className="flex gap-2 mt-4" role="group" aria-label="Timer controls">
        {isRunning ? (
          <Button variant="secondary" size="sm" onClick={pause} aria-label="Pause timer">
            Pause
          </Button>
        ) : seconds < durationSeconds ? (
          <Button variant="primary" size="sm" onClick={resume} aria-label="Resume timer">
            Resume
          </Button>
        ) : null}
        <Button variant="ghost" size="sm" onClick={reset} aria-label="Reset timer">
          Reset
        </Button>
      </div>
    </>
  );
}
