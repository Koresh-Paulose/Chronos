import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { EnergyLevel, MicroStep } from '@/types';

interface WorkPreferences {
  workStart: string;
  workEnd: string;
  breakDuration: number;
  maxDeepWorkBlock: number;
}

interface UIState {
  activeStepId: string | null;
  focusMode: boolean;
  sidebarOpen: boolean;
  theme: 'system' | 'light' | 'dark';
  lastPlanDate: string | null;
  workPreferences: WorkPreferences;
  setActiveStepId: (id: string | null) => void;
  setFocusMode: (enabled: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'system' | 'light' | 'dark') => void;
  setLastPlanDate: (date: string) => void;
  setWorkPreferences: (prefs: Partial<WorkPreferences>) => void;
  reset: () => void;
}

const initialState = {
  activeStepId: null,
  focusMode: false,
  sidebarOpen: false,
  theme: 'system' as const,
  lastPlanDate: null,
  workPreferences: {
    workStart: '09:00',
    workEnd: '17:00',
    breakDuration: 15,
    maxDeepWorkBlock: 90
  }
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      ...initialState,
      setActiveStepId: (id) => set({ activeStepId: id }),
      setFocusMode: (enabled) => set({ focusMode: enabled }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
      setLastPlanDate: (date) => set({ lastPlanDate: date }),
      setWorkPreferences: (prefs) => set((state) => ({
        workPreferences: { ...state.workPreferences, ...prefs }
      })),
      reset: () => set(initialState)
    }),
    {
      name: 'chronos-ui-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        lastPlanDate: state.lastPlanDate,
        sidebarOpen: state.sidebarOpen,
        workPreferences: state.workPreferences
      })
    }
  )
);