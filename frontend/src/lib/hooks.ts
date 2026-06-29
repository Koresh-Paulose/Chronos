import { useEffect, useCallback, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '@/lib/firebase';
import type { User } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { planApi } from '@/lib/api';

export function useAuth() {
  const [firebaseUser, loading, error] = useAuthState(firebaseAuth);

  const user: User | null = firebaseUser ? {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    emailVerified: firebaseUser.emailVerified,
    createdAt: firebaseUser.metadata.creationTime ?? '',
    lastLoginAt: firebaseUser.metadata.lastSignInTime ?? ''
  } : null;

  return { user, loading, error };
}

export function useRequireAuth() {
  const { user, loading } = useAuth();
  return { user, loading, isAuthenticated: !!user };
}

export function useKeyboardShortcuts(
  shortcuts: Record<string, () => void>,
  enabled = true
) {
  const shortcutsRef = useRef(shortcuts);
  shortcutsRef.current = shortcuts;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    const target = event.target as HTMLElement;
    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
    if (isInput && event.key !== 'Escape') return;

    const key = event.key.toLowerCase();
    const modifiers = [];

    if (event.ctrlKey || event.metaKey) modifiers.push('ctrl');
    if (event.shiftKey) modifiers.push('shift');
    if (event.altKey) modifiers.push('alt');

    const combo = [...modifiers, key].join('+');
    const action = shortcutsRef.current[combo] || shortcutsRef.current[key];

    if (action) {
      event.preventDefault();
      action();
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
}

export function useWakeLock() {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const request = useCallback(async () => {
    if ('wakeLock' in navigator) {
      try {
        wakeLockRef.current = await (navigator as Navigator & { wakeLock: { request: (type: string) => Promise<WakeLockSentinel> } }).wakeLock.request('screen');
        wakeLockRef.current.addEventListener('release', () => {
          wakeLockRef.current = null;
        });
      } catch (err) {
        console.warn('Wake Lock request failed:', err);
      }
    }
  }, []);

  const release = useCallback(async () => {
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
      } catch (err) {
        console.warn('Wake Lock release failed:', err);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      release();
    };
  }, [release]);

  return { request, release, isActive: !!wakeLockRef.current };
}

export function useFullscreen(element?: HTMLElement) {
  const elRef = useRef(element);
  elRef.current = element;

  const request = useCallback(async () => {
    const el = elRef.current ?? document.documentElement;
    if (!document.fullscreenElement) {
      try {
        await el.requestFullscreen({ navigationUI: 'hide' });
      } catch (err) {
        console.warn('Fullscreen request failed:', err);
      }
    }
  }, []);

  const exit = useCallback(async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (err) {
        console.warn('Exit fullscreen failed:', err);
      }
    }
  }, []);

  const isFullscreen = !!document.fullscreenElement;

  useEffect(() => {
    const handleChange = () => {
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  return { request, exit, isFullscreen };
}

export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return 'denied';
    const perm = await Notification.requestPermission();
    setPermission(perm);
    return perm;
  }, []);

  const show = useCallback((title: string, options?: NotificationOptions) => {
    if (permission === 'granted') {
      return new Notification(title, options);
    }
    return null;
  }, [permission]);

  return { permission, requestPermission, show };
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function usePlanByDate(date: string) {
  return useQuery({
    queryKey: ['plan', date],
    queryFn: () => planApi.get(date)
  });
}

export function useGeneratePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: Parameters<typeof planApi.generate>[0]) => planApi.generate(request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['plan', variables.date] });
    }
  });
}

export function useCompleteStep() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: Parameters<typeof planApi.completeStep>[0]) => planApi.completeStep(request),
    onSuccess: (data) => {
      if (data?.plan?.date) {
        queryClient.invalidateQueries({ queryKey: ['plan', data.plan.date] });
      } else {
        queryClient.invalidateQueries({ queryKey: ['plan'] });
      }
    }
  });
}

export function useRejectedTasks(date: string) {
  return useQuery({
    queryKey: ['rejectedTasks', date],
    queryFn: () => planApi.getRejected(date)
  });
}

export function useDismissRejected() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ planId, taskId }: { planId: string; taskId: string }) => planApi.dismissRejected(planId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rejectedTasks'] });
    }
  });
}