import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { EnergyLevel } from '@/types';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function formatTime24(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function formatDurationLong(minutes: number): string {
  if (minutes < 60) return `${minutes} minutes`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ${mins} minutes` : `${hours} hour${hours > 1 ? 's' : ''}`;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
}

export function formatDateLong(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

export function formatISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getTodayISO(): string {
  return formatISODate(new Date());
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, ms: number): T {
  let timeoutId: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  }) as T;
}

export function throttle<T extends (...args: unknown[]) => unknown>(fn: T, ms: number): T {
  let lastCall = 0;
  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall >= ms) {
      lastCall = now;
      fn(...args);
    }
  }) as T;
}

export function getEnergyColor(energy: EnergyLevel): string {
  const colors: Record<EnergyLevel, string> = {
    high: '#00E5A0',
    medium: '#FFB800',
    low: '#00D4FF'
  };
  return colors[energy];
}

export function getEnergyBgClass(energy: EnergyLevel): string {
  const classes: Record<EnergyLevel, string> = {
    high: 'bg-accent-primary/10 border-accent-primary/20',
    medium: 'bg-accent-warn/10 border-accent-warn/20',
    low: 'bg-accent-info/10 border-accent-info/20'
  };
  return classes[energy];
}

export function getEnergyTextClass(energy: EnergyLevel): string {
  const classes: Record<EnergyLevel, string> = {
    high: 'text-accent-primary',
    medium: 'text-accent-warn',
    low: 'text-accent-info'
  };
  return classes[energy];
}

export function getEnergyBorderClass(energy: EnergyLevel): string {
  const classes: Record<EnergyLevel, string> = {
    high: 'border-l-accent-primary',
    medium: 'border-l-accent-warn',
    low: 'border-l-accent-info'
  };
  return classes[energy];
}

export function calculateProgress(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.min(Math.max((current / total) * 100, 0), 100);
}

export function secondsToMMSS(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function parseTimeString(time: string): { hours: number; minutes: number } {
  const [hours, minutes] = time.split(':').map(Number);
  return { hours, minutes };
}

export function timeStringToMinutes(time: string): number {
  const { hours, minutes } = parseTimeString(time);
  return hours * 60 + minutes;
}

export function minutesToTimeString(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

export function isToday(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return d.toDateString() === today.toDateString();
}

export function isPast(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d < new Date();
}

export function isFuture(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d > new Date();
}

export function getRelativeTimeString(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffMins = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);

  if (Math.abs(diffMins) < 1) return 'just now';
  if (Math.abs(diffMins) < 60) return diffMins > 0 ? `in ${diffMins}m` : `${Math.abs(diffMins)}m ago`;
  if (Math.abs(diffHours) < 24) return diffHours > 0 ? `in ${diffHours}h` : `${Math.abs(diffHours)}h ago`;
  return diffDays > 0 ? `in ${diffDays}d` : `${Math.abs(diffDays)}d ago`;
}