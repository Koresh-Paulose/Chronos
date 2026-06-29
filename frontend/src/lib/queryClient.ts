import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: (failureCount, error) => {
        if (failureCount >= 3) return false;
        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as { status?: number }).status;
          if (status === 401 || status === 403 || status === 404) return false;
        }
        return true;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always'
    },
    mutations: {
      retry: false
    }
  }
});

export const queryKeys = {
  plan: {
    current: ['plan', 'current'] as const,
    byDate: (date: string) => ['plan', date] as const,
    rejected: (date: string) => ['plan', date, 'rejected'] as const
  },
  tasks: {
    all: ['tasks'] as const
  },
  user: {
    profile: ['user', 'profile'] as const,
    preferences: ['user', 'preferences'] as const
  }
} as const;