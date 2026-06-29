import type { APIError, DayPlan, GeneratePlanRequest, GeneratePlanResponse, MicroStep, StepCompleteRequest, StepCompleteResponse, TaskIn, TimeBlock, RejectedTask } from '@/types';
import { hasFirebaseConfig } from './firebase';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  return headers;
}

async function withAuthHeaders(): Promise<HeadersInit> {
  const { getIdToken } = await import('./firebase');
  let token = await getIdToken();
  let user = await import('./firebase').then(m => m.getCurrentUser());

  // Check if we are in incognito / guest mode
  const isIncognito = localStorage.getItem('chronos-incognito-user');
  if (isIncognito) {
    token = 'mock-token-abc';
    try {
      const parsedUser = JSON.parse(isIncognito);
      user = { uid: parsedUser.uid, email: parsedUser.email } as any;
    } catch {
      user = { uid: 'mock-uid-123', email: 'dev@example.com' } as any;
    }
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (user) {
    headers['X-User-ID'] = user.uid;
    if (user.email) {
      headers['X-User-Email'] = user.email;
    }
  }

  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: APIError = {
      code: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred',
      status: response.status
    };

    try {
      const data = await response.json();
      errorData = { ...errorData, ...data };
    } catch {}

    const error = new Error(errorData.message) as Error & { code?: string; status?: number; details?: Record<string, unknown> };
    error.code = errorData.code;
    error.status = errorData.status;
    error.details = errorData.details;
    throw error;
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  const headers = await withAuthHeaders();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers,
    credentials: 'omit'
  });
  return handleResponse<T>(response);
}

export async function apiPost<T>(endpoint: string, body: unknown): Promise<T> {
  const headers = await withAuthHeaders();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    credentials: 'omit'
  });
  return handleResponse<T>(response);
}

export async function apiPut<T>(endpoint: string, body: unknown): Promise<T> {
  const headers = await withAuthHeaders();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
    credentials: 'omit'
  });
  return handleResponse<T>(response);
}

export async function apiDelete<T>(endpoint: string): Promise<T> {
  const headers = await withAuthHeaders();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers,
    credentials: 'omit'
  });
  return handleResponse<T>(response);
}

function mapBackendPlanToDayPlan(rawResponse: any): DayPlan | null {
  if (!rawResponse) return null;
  return {
    id: rawResponse.planId || rawResponse.plan_id || rawResponse.id,
    date: rawResponse.date,
    total_planned_minutes: rawResponse.totalPlannedMin || rawResponse.total_planned_min || rawResponse.total_planned_minutes || 0,
    created_at: rawResponse.createdAt || rawResponse.created_at || new Date().toISOString(),
    updated_at: rawResponse.updatedAt || rawResponse.updated_at || rawResponse.created_at || new Date().toISOString(),
    advice: rawResponse.advice,
    rejected_tasks: (rawResponse.rejectedTasks || rawResponse.rejected_tasks || []).map((t: string | any, i: number) => {
      if (typeof t === 'string') {
        return { id: `rej-${i}`, title: t, reason: 'Rejected by AI', energy_level: 'medium', estimated_minutes: 0 };
      }
      return {
        id: t.id || `rej-${i}`,
        title: t.title,
        reason: t.reason || 'Rejected by AI',
        energy_level: t.energyLevel || t.energy_level || 'medium',
        estimated_minutes: t.estimatedMinutes || t.estimated_minutes || 0
      };
    }),
    blocks: (rawResponse.blocks || []).map((b: any) => ({
      id: b.blockId || b.block_id || b.id,
      start_time: b.start || b.start_time,
      end_time: b.end || b.end_time,
      energy_level: (b.energyRequired || b.energy_required || b.energy_level || 'Med').toLowerCase() === 'med' ? 'medium' : (b.energyRequired || b.energy_required || b.energy_level || 'medium').toLowerCase(),
      task_title: b.taskTitle || b.task_title,
      task_summary: b.taskSummary || b.task_summary || 'Task details',
      steps: (b.microSteps || b.micro_steps || b.steps || []).map((s: any, idx: number) => ({
        id: s.id || `step-${b.blockId || b.id}-${idx}`,
        order: s.order || idx + 1,
        text: s.step || s.text,
        duration_min: s.durationMin || s.duration_min,
        energy_cost: (b.energyRequired || b.energy_required || 'Med').toLowerCase() === 'med' ? 'medium' : (b.energyRequired || b.energy_required || 'medium').toLowerCase(),
        reason: s.reason || '',
        target_url: s.targetUrl || s.target_url || null,
        completed_at: s.completedAt || s.completed_at || null,
        started_at: s.startedAt || s.started_at || null
      }))
    }))
  };
}

// HTTP API implementation
const planApiHttp = {
  generate: async (request: GeneratePlanRequest): Promise<GeneratePlanResponse> => {
    // Map the frontend GeneratePlanRequest to the backend PlanRequest structure
    const mappedTasks = request.tasks.map(t => {
      // Map energy level: 'high' -> 'High', 'medium' -> 'Med', 'low' -> 'Low'
      let mappedEnergy: 'High' | 'Med' | 'Low' = 'Med';
      if (t.energy_level === 'high') mappedEnergy = 'High';
      if (t.energy_level === 'low') mappedEnergy = 'Low';

      return {
        title: t.title,
        estMinutes: t.estimated_minutes,
        energy: mappedEnergy,
        url: t.source_id || undefined
      };
    });

    // Read work preferences from local storage if available
    let workStart = '09:00';
    let workEnd = '18:00';
    try {
      const storeSaved = localStorage.getItem('chronos-ui-store');
      if (storeSaved) {
        const store = JSON.parse(storeSaved);
        if (store.state?.workPreferences?.workStart) {
          workStart = store.state.workPreferences.workStart;
        }
        if (store.state?.workPreferences?.workEnd) {
          workEnd = store.state.workPreferences.workEnd;
        }
      }
    } catch {}

    const backendPayload = {
      tasks: mappedTasks,
      workStart,
      workEnd,
      energyPeak: 'High' as const
    };

    const rawResponse = await apiPost<any>('/api/plan', backendPayload);
    const plan = mapBackendPlanToDayPlan(rawResponse);
    if (!plan) throw new Error("Failed to map DayPlan");
    return {
      plan,
      metadata: {
        total_tasks: request.tasks.length,
        rejected_count: plan.rejected_tasks.length,
        generation_time_ms: 0
      }
    };
  },
  get: async (date: string): Promise<DayPlan> => {
    const rawResponse = await apiGet<any>(`/api/plan/${date}`);
    return mapBackendPlanToDayPlan(rawResponse);
  },
  getCurrent: async (): Promise<DayPlan | null> => {
    try {
      const rawResponse = await apiGet<any>('/api/plan/today');
      return mapBackendPlanToDayPlan(rawResponse);
    } catch {
      return null;
    }
  },
  completeStep: async (request: StepCompleteRequest): Promise<StepCompleteResponse> => {
    // Extract blockId and stepIdx from step_id (formatted as step-<blockId>-<idx>)
    const parts = request.step_id.split('-');
    const blockId = parts[1] || 'unknown';
    const stepIdx = parseInt(parts[2], 10) || 0;

    const backendPayload = {
      blockId,
      stepIdx
    };

    await apiPost<any>('/api/step/complete', backendPayload);

    const date = request.plan_id.replace('plan-', '') || new Date().toISOString().split('T')[0];
    return {
      success: true,
      next_step_id: null,
      plan: { date } as any
    };
  },
  getRejected: (date: string) => apiGet<{ rejected_tasks: TaskIn[] }>(`/api/plan/${date}/rejected`),
  dismissRejected: (planId: string, taskId: string) => apiPost<{ success: boolean }>(`/api/plan/${planId}/rejected/${taskId}/dismiss`, {})
};

// Local storage fallback implementation for fast, offline, backend-free execution
const planApiFallback = {
  generate: async (request: GeneratePlanRequest): Promise<GeneratePlanResponse> => {
    // Short artificial delay for realism
    await new Promise(r => setTimeout(r, 600));

    const blocks: TimeBlock[] = [];
    const rejected_tasks: RejectedTask[] = [];
    const rejectedTasks: TaskIn[] = [];
    
    let total_planned_minutes = 0;
    let workStart = '09:00';
    try {
      const storeSaved = localStorage.getItem('chronos-ui-store');
      if (storeSaved) {
        const store = JSON.parse(storeSaved);
        if (store.state?.workPreferences?.workStart) {
          workStart = store.state.workPreferences.workStart;
        }
      }
    } catch {}
    
    const [startHour, startMin] = workStart.split(':').map(Number);
    let current_time_min = startHour * 60 + startMin;

    const inputTasks = request.tasks && request.tasks.length > 0 ? request.tasks : [
      {
        id: 'task-1',
        title: 'Core Development Sprint',
        description: 'Focus on core system architecture and state hooks.',
        estimated_minutes: 90,
        energy_level: 'high' as const,
        deadline: null,
        tags: [],
        source: 'manual' as const,
        source_id: null,
        created_at: new Date().toISOString()
      },
      {
        id: 'task-2',
        title: 'UI Design Refinement',
        description: 'Polish components, animations, and typography.',
        estimated_minutes: 90,
        energy_level: 'medium' as const,
        deadline: null,
        tags: [],
        source: 'manual' as const,
        source_id: null,
        created_at: new Date().toISOString()
      },
      {
        id: 'task-3',
        title: 'Admin Work & Ingestion Review',
        description: 'Process feedback logs, review roadmaps, and reply to queries.',
        estimated_minutes: 90,
        energy_level: 'low' as const,
        deadline: null,
        tags: [],
        source: 'manual' as const,
        source_id: null,
        created_at: new Date().toISOString()
      }
    ];

    for (let i = 0; i < inputTasks.length; i++) {
      const task = inputTasks[i];
      
      if (total_planned_minutes + task.estimated_minutes > 360) {
        rejected_tasks.push({
          id: task.id,
          title: task.title,
          reason: 'Rejected: Daily Cognitive Load Cap of 360 minutes Exceeded.',
          energy_level: task.energy_level,
          estimated_minutes: task.estimated_minutes
        });
        rejectedTasks.push(task);
        continue;
      }

      const sh = Math.floor(current_time_min / 60);
      const sm = current_time_min % 60;
      const start_time = `${sh.toString().padStart(2, '0')}:${sm.toString().padStart(2, '0')}`;
      
      current_time_min += task.estimated_minutes;
      
      const eh = Math.floor(current_time_min / 60);
      const em = current_time_min % 60;
      const end_time = `${eh.toString().padStart(2, '0')}:${em.toString().padStart(2, '0')}`;

      const steps: MicroStep[] = [];
      let remaining = task.estimated_minutes;
      
      const setup_dur = Math.min(15, remaining);
      steps.push({
        id: `step-${task.id}-setup`,
        order: 1,
        text: `Setup and initialize working environment for ${task.title}`,
        duration_min: setup_dur,
        energy_cost: task.energy_level,
        reason: 'Establishing workspace tools avoids context switching delay.',
        target_url: task.source_id && task.source_id.startsWith('http') ? task.source_id : null,
        completed_at: null,
        started_at: null
      });
      remaining -= setup_dur;

      let step_idx = 1;
      while (remaining > 0) {
        const exec_dur = Math.min(60, remaining);
        steps.push({
          id: `step-${task.id}-exec-${step_idx}`,
          order: step_idx + 1,
          text: `Execute core implementation phase ${step_idx} of ${task.title}`,
          duration_min: exec_dur,
          energy_cost: task.energy_level,
          reason: 'Focused sprint block keeps cognitive momentum high.',
          target_url: task.source_id && task.source_id.startsWith('http') ? task.source_id : null,
          completed_at: null,
          started_at: null
        });
        remaining -= exec_dur;
        step_idx++;
      }

      blocks.push({
        id: `block-${task.id}`,
        start_time,
        end_time,
        energy_level: task.energy_level,
        task_title: task.title,
        task_summary: task.description || 'Decomposed action roadmap.',
        steps
      });

      total_planned_minutes += task.estimated_minutes;

      if (i < inputTasks.length - 1 && total_planned_minutes < 360) {
        const bsh = Math.floor(current_time_min / 60);
        const bsm = current_time_min % 60;
        const break_start = `${bsh.toString().padStart(2, '0')}:${bsm.toString().padStart(2, '0')}`;
        
        current_time_min += 15;
        
        const beh = Math.floor(current_time_min / 60);
        const bem = current_time_min % 60;
        const break_end = `${beh.toString().padStart(2, '0')}:${bem.toString().padStart(2, '0')}`;

        blocks.push({
          id: `block-break-${i}`,
          start_time: break_start,
          end_time: break_end,
          energy_level: 'low',
          task_title: 'Break / Recharge',
          task_summary: 'Stand up, hydrate, and refresh your vision.',
          steps: [
            {
              id: `step-break-${i}-1`,
              order: 1,
              text: 'Stand up and stretch',
              duration_min: 5,
              energy_cost: 'low',
              reason: 'Relieves physical tension.',
              target_url: null,
              completed_at: null,
              started_at: null
            },
            {
              id: `step-break-${i}-2`,
              order: 2,
              text: 'Hydrate',
              duration_min: 5,
              energy_cost: 'low',
              reason: 'Maintains fluid balance and focus.',
              target_url: null,
              completed_at: null,
              started_at: null
            },
            {
              id: `step-break-${i}-3`,
              order: 3,
              text: 'Look 20ft away into the distance',
              duration_min: 5,
              energy_cost: 'low',
              reason: 'Prevents eye strain.',
              target_url: null,
              completed_at: null,
              started_at: null
            }
          ]
        });
      }
    }

    const planId = 'plan-' + request.date;
    const plan: DayPlan = {
      id: planId,
      date: request.date,
      total_planned_minutes,
      blocks,
      rejected_tasks,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      advice: request.tasks && request.tasks.length === 1
        ? `Attack the setup sprint for "${request.tasks[0].title}" first. Breaking your main goal into granular steps mitigates cognitive overwhelm.`
        : "Momentum follows action. Execute your high-energy blocks first to leverage early morning focus."
    };

    localStorage.setItem('chronos-plan-' + request.date, JSON.stringify(plan));
    localStorage.setItem('chronos-rejected-' + request.date, JSON.stringify(rejectedTasks));

    return {
      plan,
      metadata: {
        total_tasks: inputTasks.length,
        rejected_count: rejectedTasks.length,
        generation_time_ms: 120
      }
    };
  },

  get: async (date: string): Promise<DayPlan | null> => {
    const saved = localStorage.getItem('chronos-plan-' + date);
    if (!saved) return null;
    return JSON.parse(saved);
  },

  getCurrent: async (): Promise<DayPlan | null> => {
    const today = new Date().toISOString().split('T')[0];
    return planApiFallback.get(today);
  },

  completeStep: async (request: StepCompleteRequest): Promise<StepCompleteResponse> => {
    const date = request.plan_id.replace('plan-', '') || new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem('chronos-plan-' + date);
    if (!saved) throw new Error('Plan not found');

    const plan: DayPlan = JSON.parse(saved);
    let updated = false;
    for (const block of plan.blocks) {
      const step = block.steps.find(s => s.id === request.step_id);
      if (step) {
        step.completed_at = request.completed_at;
        updated = true;
        break;
      }
    }

    if (updated) {
      plan.updated_at = new Date().toISOString();
      localStorage.setItem('chronos-plan-' + date, JSON.stringify(plan));
    }

    return {
      success: true,
      next_step_id: null,
      plan
    };
  },

  getRejected: async (date: string): Promise<{ rejected_tasks: TaskIn[] }> => {
    const saved = localStorage.getItem('chronos-rejected-' + date);
    if (!saved) return { rejected_tasks: [] };
    return { rejected_tasks: JSON.parse(saved) };
  },

  dismissRejected: async (planId: string, taskId: string): Promise<{ success: boolean }> => {
    const date = planId.replace('plan-', '');
    const saved = localStorage.getItem('chronos-rejected-' + date);
    if (saved) {
      const tasks: TaskIn[] = JSON.parse(saved);
      const filtered = tasks.filter(t => t.id !== taskId);
      localStorage.setItem('chronos-rejected-' + date, JSON.stringify(filtered));

      // Update plan object as well
      const savedPlan = localStorage.getItem('chronos-plan-' + date);
      if (savedPlan) {
        const plan: DayPlan = JSON.parse(savedPlan);
        plan.rejected_tasks = plan.rejected_tasks.filter(t => t.id !== taskId);
        localStorage.setItem('chronos-plan-' + date, JSON.stringify(plan));
      }
    }
    return { success: true };
  }
};

export const planApi = hasFirebaseConfig ? planApiHttp : planApiFallback;

// Tasks API fallback
const tasksApiHttp = {
  list: () => apiGet<TaskIn[]>('/api/tasks'),
  create: (task: Omit<TaskIn, 'id' | 'created_at'>) => apiPost<TaskIn>('/api/tasks', task),
  update: (id: string, task: Partial<TaskIn>) => apiPut<TaskIn>(`/api/tasks/${id}`, task),
  delete: (id: string) => apiDelete<void>(`/api/tasks/${id}`)
};

const tasksApiFallback = {
  list: async (): Promise<TaskIn[]> => {
    const saved = localStorage.getItem('chronos-tasks');
    if (!saved) return [];
    return JSON.parse(saved);
  },
  create: async (task: Omit<TaskIn, 'id' | 'created_at'>): Promise<TaskIn> => {
    const saved = localStorage.getItem('chronos-tasks');
    const tasks: TaskIn[] = saved ? JSON.parse(saved) : [];
    const newTask: TaskIn = {
      ...task,
      id: 'task-' + Math.random().toString(36).slice(2),
      created_at: new Date().toISOString()
    };
    tasks.push(newTask);
    localStorage.setItem('chronos-tasks', JSON.stringify(tasks));
    return newTask;
  },
  update: async (id: string, task: Partial<TaskIn>): Promise<TaskIn> => {
    const saved = localStorage.getItem('chronos-tasks');
    const tasks: TaskIn[] = saved ? JSON.parse(saved) : [];
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    const updatedTask = { ...tasks[index], ...task };
    tasks[index] = updatedTask;
    localStorage.setItem('chronos-tasks', JSON.stringify(tasks));
    return updatedTask;
  },
  delete: async (id: string): Promise<void> => {
    const saved = localStorage.getItem('chronos-tasks');
    const tasks: TaskIn[] = saved ? JSON.parse(saved) : [];
    const filtered = tasks.filter(t => t.id !== id);
    localStorage.setItem('chronos-tasks', JSON.stringify(filtered));
  }
};

export const tasksApi = hasFirebaseConfig ? tasksApiHttp : tasksApiFallback;

// User API fallback
const userApiHttp = {
  getProfile: () => apiGet<{ user: { uid: string; email: string; displayName: string | null; photoURL: string | null } }>('/api/user/profile'),
  updatePreferences: (prefs: Record<string, unknown>) => apiPut<{ success: boolean }>('/api/user/preferences', prefs)
};

const userApiFallback = {
  getProfile: async () => ({
    user: {
      uid: 'mock-uid-123',
      email: 'dev@example.com',
      displayName: 'Local Developer',
      photoURL: 'https://api.dicebear.com/7.x/bottts/svg?seed=dev'
    }
  }),
  updatePreferences: async (prefs: Record<string, unknown>) => {
    localStorage.setItem('chronos-user-preferences', JSON.stringify(prefs));
    return { success: true };
  }
};

export const userApi = hasFirebaseConfig ? userApiHttp : userApiFallback;

export const healthApi = {
  check: () => apiGet<{ status: string; timestamp: string }>('/health')
};