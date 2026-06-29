export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
}

export interface MicroStep {
  id: string;
  order: number;
  text: string;
  duration_min: number;
  energy_cost: 'high' | 'medium' | 'low';
  reason: string;
  target_url: string | null;
  completed_at: string | null;
  started_at: string | null;
}

export interface TimeBlock {
  id: string;
  start_time: string;
  end_time: string;
  energy_level: 'high' | 'medium' | 'low';
  task_title: string;
  task_summary: string;
  steps: MicroStep[];
}

export interface RejectedTask {
  id: string;
  title: string;
  reason: string;
  energy_level: 'high' | 'medium' | 'low';
  estimated_minutes: number;
}

export interface DayPlan {
  id: string;
  date: string;
  total_planned_minutes: number;
  blocks: TimeBlock[];
  rejected_tasks: RejectedTask[];
  created_at: string;
  updated_at: string;
  advice?: string;
}

export interface TaskIn {
  id: string;
  title: string;
  description: string;
  estimated_minutes: number;
  energy_level: 'high' | 'medium' | 'low';
  deadline: string | null;
  tags: string[];
  source: 'manual' | 'calendar' | 'email' | 'slack' | 'notion';
  source_id: string | null;
  created_at: string;
}

export interface GeneratePlanRequest {
  date: string;
  tasks: TaskIn[];
  preferences?: {
    work_start: string;
    work_end: string;
    break_duration: number;
    max_deep_work_block: number;
  };
}

export interface GeneratePlanResponse {
  plan: DayPlan;
  metadata: {
    total_tasks: number;
    rejected_count: number;
    generation_time_ms: number;
  };
}

export interface StepCompleteRequest {
  plan_id: string;
  step_id: string;
  completed_at: string;
  duration_actual_seconds: number;
  was_interrupted: boolean;
}

export interface StepCompleteResponse {
  success: boolean;
  next_step_id: string | null;
  plan: DayPlan;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  status: number;
}

export type EnergyLevel = 'high' | 'medium' | 'low';

export const ENERGY_ORDER: Record<EnergyLevel, number> = {
  high: 3,
  medium: 2,
  low: 1
};

export const ENERGY_COLORS: Record<EnergyLevel, string> = {
  high: '#00E5A0',
  medium: '#FFB800',
  low: '#00D4FF'
};

export const ENERGY_LABELS: Record<EnergyLevel, string> = {
  high: 'High Energy',
  medium: 'Medium Energy',
  low: 'Low Energy'
};