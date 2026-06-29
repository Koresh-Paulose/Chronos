import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { FooterFAB } from '@/components/layout/FooterFAB';
import { FocusModeOverlay } from '@/components/layout/FocusModeOverlay';
import { PlanView } from '@/components/plan/PlanView';
import { EmptyState } from '@/components/plan/EmptyState';
import { TimeBlock } from '@/components/plan/TimeBlock';
import { RejectedTasksModal } from '@/components/plan/RejectedTasksModal';
import { usePlanByDate, useGeneratePlan, useCompleteStep, useRejectedTasks, useDismissRejected } from '@/lib/hooks';
import { useUIStore } from '@/lib/store';
import { useWakeLock, useFullscreen, useNotification } from '@/lib/hooks';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TimerDisplay } from '@/components/ui/TimerDisplay';
import { AlertCircle, Target, Loader2, Trash2, Brain, Gamepad2 } from 'lucide-react';
import { cn, formatDate, getTodayISO } from '@/lib/utils';
import type { DayPlan, MicroStep, TaskIn } from '@/types';
import { useToast } from '@/components/ui/Toast';

export function PlanPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { activeStepId, focusMode, setActiveStepId, setFocusMode, setLastPlanDate } = useUIStore();
  const [planDate, setPlanDate] = useState(getTodayISO());
  const [showRejected, setShowRejected] = useState(false);
  const [focusStep, setFocusStep] = useState<MicroStep | null>(null);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const { toast, toasts, Toaster } = useToast();

  // Task intake form states
  const [intakeMode, setIntakeMode] = useState<'sprints' | 'goal'>('goal'); // default to goal (Recommended)
  const [draftTasks, setDraftTasks] = useState<TaskIn[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDuration, setNewDuration] = useState(30);
  const [newEnergy, setNewEnergy] = useState<'high' | 'medium' | 'low'>('medium');
  const [newUrl, setNewUrl] = useState('');

  // AI Single Goal states
  const [goalDescription, setGoalDescription] = useState('');
  const [goalDuration, setGoalDuration] = useState(120);
  const [goalEnergy, setGoalEnergy] = useState<'high' | 'medium' | 'low'>('medium');

  const { data: plan, isLoading, refetch } = usePlanByDate(planDate);
  const generatePlanMutation = useGeneratePlan();
  const completeStepMutation = useCompleteStep();
  const { data: rejectedData } = useRejectedTasks(planDate);
  const dismissRejectedMutation = useDismissRejected();

  const completedStepIds = new Set<string>(
    plan?.blocks.flatMap((b) => b.steps.filter((s) => s.completed_at).map((s) => s.id)) ?? []
  );

  const activeStep = plan?.blocks.flatMap((b) => b.steps).find((s) => s.id === activeStepId) ?? null;

  const totalPlannedMinutes = plan?.total_planned_minutes ?? 0;
  const rejectedCount = rejectedData?.rejected_tasks.length ?? 0;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: TaskIn = {
      id: 'task-' + Math.random().toString(36).substring(2, 9),
      title: newTitle.trim(),
      description: '',
      estimated_minutes: newDuration,
      energy_level: newEnergy,
      deadline: null,
      tags: [],
      source: 'manual',
      source_id: newUrl.trim() || null,
      created_at: new Date().toISOString()
    };

    setDraftTasks((prev) => [...prev, newTask]);
    setNewTitle('');
    setNewUrl('');
  };

  const handleRemoveTask = (id: string) => {
    setDraftTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const totalDraftMinutes = draftTasks.reduce((acc, t) => acc + t.estimated_minutes, 0);

  const handleGeneratePlan = async () => {
    try {
      await generatePlanMutation.mutateAsync({ date: planDate, tasks: draftTasks });
      toast({ title: 'Plan Generated', description: 'Your battle plan is ready', variant: 'success' });
    } catch (err) {
      toast({ title: 'Failed to Generate', description: 'Could not create plan', variant: 'danger' });
    }
  };

  const handleGenerateGoalPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalDescription.trim()) return;

    const goalTask: TaskIn = {
      id: 'task-goal',
      title: goalDescription.trim(),
      description: 'Single Goal Mode Plan',
      estimated_minutes: goalDuration,
      energy_level: goalEnergy,
      deadline: null,
      tags: ['goal'],
      source: 'manual',
      source_id: null,
      created_at: new Date().toISOString()
    };

    try {
      await generatePlanMutation.mutateAsync({ date: planDate, tasks: [goalTask] });
      toast({ title: 'Plan Generated', description: 'AI has assembled your micro steps', variant: 'success' });
    } catch (err) {
      toast({ title: 'Failed to Generate', description: 'Could not generate plan', variant: 'danger' });
    }
  };

  const handleResetPlan = async () => {
    if (window.confirm("Are you sure you want to delete today's plan? This will clear all logged completions.")) {
      localStorage.removeItem('chronos-plan-' + planDate);
      localStorage.removeItem('chronos-rejected-' + planDate);
      toast({ title: 'Plan Reset', description: 'Your schedule has been cleared', variant: 'success' });
      refetch();
    }
  };

  const handleLaunchStep = async (step: MicroStep) => {
    setActiveStepId(step.id);
    setFocusStep(step);
    setFocusSeconds(step.duration_min * 60);
    setFocusMode(true);

    if (step.target_url) {
      window.open(step.target_url, '_blank', 'noopener,noreferrer');
    }

    try {
      await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
      const wakeLock = await (navigator as Navigator & { wakeLock: { request: (type: string) => Promise<WakeLockSentinel> } }).wakeLock.request('screen');
      setWakeLockActive(true);
      wakeLock.addEventListener('release', () => setWakeLockActive(false));
    } catch (err) {
      console.warn('Fullscreen/WakeLock failed:', err);
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Sprint Started', { body: step.text, icon: '/icons/icon-192.png' });
    }
  };

  const handleFinishEarly = () => {
    if (activeStepId) {
      completeStepMutation.mutate({
        plan_id: plan?.id ?? '',
        step_id: activeStepId,
        completed_at: new Date().toISOString(),
        duration_actual_seconds: focusSeconds,
        was_interrupted: false
      });
    }
    cleanupFocusMode();
  };

  const handleAbort = () => {
    cleanupFocusMode();
  };

  const cleanupFocusMode = () => {
    setActiveStepId(null);
    setFocusStep(null);
    setFocusSeconds(0);
    setFocusMode(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleCompleteStep = (stepId: string) => {
    const step = plan?.blocks.flatMap((b) => b.steps).find((s) => s.id === stepId);
    if (step) {
      completeStepMutation.mutate({
        plan_id: plan?.id ?? '',
        step_id: stepId,
        completed_at: new Date().toISOString(),
        duration_actual_seconds: step.duration_min * 60,
        was_interrupted: false
      });
    }
  };

  const handleReopenStep = (stepId: string) => {
    // Implementation for reopening a step
  };

  const handleDismissRejected = (taskId: string) => {
    dismissRejectedMutation.mutate({ planId: plan?.id ?? '', taskId });
  };

  const handleNewPlan = () => {
    if (window.confirm("Start a new plan? This will clear today's current plan and let you compile a new one.")) {
      localStorage.removeItem('chronos-plan-' + planDate);
      localStorage.removeItem('chronos-rejected-' + planDate);
      toast({ title: 'Plan Reset', description: 'Enter your sprint tasks for today', variant: 'success' });
      refetch();
    }
  };

  const handleViewRejected = () => setShowRejected(true);

  const handleOpenSettings = () => {
    navigate('/settings');
  };

  const renderTaskIntake = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Mode Selector Tab Bar */}
      <div className="flex gap-3 border-b border-border-subtle pb-4 flex-wrap">
        <button
          onClick={() => setIntakeMode('goal')}
          className={cn(
            "px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all flex items-center gap-2",
            intakeMode === 'goal'
              ? "bg-accent-primary/10 border-accent-primary text-accent-primary shadow-glow-sm"
              : "border-border-subtle hover:border-border-glow text-text-secondary"
          )}
        >
          <Brain className="h-4 w-4" />
          AI Goal Planner (Recommended)
        </button>
        <button
          onClick={() => setIntakeMode('sprints')}
          className={cn(
            "px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all flex items-center gap-2",
            intakeMode === 'sprints'
              ? "bg-accent-primary/10 border-accent-primary text-accent-primary shadow-glow-sm"
              : "border-border-subtle hover:border-border-glow text-text-secondary"
          )}
        >
          <Target className="h-4 w-4" />
          Guided Task List
        </button>
      </div>

      {intakeMode === 'goal' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* AI Single Goal Form */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold text-text-primary mb-1">State Your Goal</h2>
              <p className="text-sm text-text-secondary">Type today's main objective. AI will build your schedule roadmap and steps.</p>
            </div>

            <Card variant="glass" className="p-6">
              <form onSubmit={handleGenerateGoalPlan} className="space-y-5">
                <div>
                  <label className="label">What do you want to achieve today?</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Build a Python web scraper using BeautifulSoup and save results to a CSV file..."
                    className="input resize-none py-3"
                    value={goalDescription}
                    onChange={(e) => setGoalDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Estimated Total Duration (minutes)</label>
                    <input
                      type="number"
                      min="15"
                      max="360"
                      step="15"
                      className="input"
                      value={goalDuration}
                      onChange={(e) => setGoalDuration(parseInt(e.target.value) || 120)}
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Cognitive Demand / Energy Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['low', 'medium', 'high'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setGoalEnergy(lvl)}
                          className={cn(
                            'px-3 py-2 rounded-xl text-xs font-medium border capitalize transition-all',
                            goalEnergy === lvl
                              ? lvl === 'high'
                                ? 'bg-accent-danger/10 border-accent-danger text-accent-danger'
                                : lvl === 'medium'
                                ? 'bg-accent-warn/10 border-accent-warn text-accent-warn'
                                : 'bg-accent-info/10 border-accent-info text-accent-info'
                              : 'border-border-subtle hover:border-border-glow text-text-secondary'
                          )}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={!goalDescription.trim() || generatePlanMutation.isPending}
                  leftIcon={<Brain className="h-5 w-5" />}
                >
                  {generatePlanMutation.isPending ? 'Decomposing Goal...' : 'Compile AI Battle Plan'}
                </Button>
              </form>
            </Card>
          </div>

          {/* AI Guide Card */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold text-text-primary mb-1">AI Coaching Parameters</h2>
              <p className="text-sm text-text-secondary">How our productivity coach transforms goals.</p>
            </div>

            <Card variant="glass" className="p-6 space-y-4">
              <div className="flex gap-3 text-sm">
                <div className="w-6 h-6 rounded-lg bg-accent-primary/10 text-accent-primary flex items-center justify-center shrink-0 font-bold font-mono">1</div>
                <p className="text-text-secondary leading-relaxed"><strong className="text-text-primary">Granular Action Decomposition:</strong> Translates your high-level objective into precise micro-steps under 60 minutes to eliminate setup inertia.</p>
              </div>
              <div className="flex gap-3 text-sm">
                <div className="w-6 h-6 rounded-lg bg-accent-primary/10 text-accent-primary flex items-center justify-center shrink-0 font-bold font-mono">2</div>
                <p className="text-text-secondary leading-relaxed"><strong className="text-text-primary">Integrated Breaks:</strong> Intersperses structured 15-minute breaks after deep-work intervals to guard against visual and mental fatigue.</p>
              </div>
              <div className="flex gap-3 text-sm">
                <div className="w-6 h-6 rounded-lg bg-accent-primary/10 text-accent-primary flex items-center justify-center shrink-0 font-bold font-mono">3</div>
                <p className="text-text-secondary leading-relaxed"><strong className="text-text-primary">Coaching Advisory:</strong> Generates tailored coaching advice blocks guiding your mindset on the exact order of sprints.</p>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Manual Task List Creation */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold text-text-primary mb-1">Assemble Sprints</h2>
              <p className="text-sm text-text-secondary">List your objectives for today. We'll decompose them into micro-steps.</p>
            </div>

            <Card variant="glass" className="p-6">
              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label className="label">Task Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Code auth gate middleware"
                    className="input"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Estimated Duration (minutes)</label>
                    <input
                      type="number"
                      min="5"
                      max="480"
                      step="5"
                      className="input"
                      value={newDuration}
                      onChange={(e) => setNewDuration(parseInt(e.target.value) || 30)}
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Cognitive Demand / Energy Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['low', 'medium', 'high'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setNewEnergy(lvl)}
                          className={cn(
                            'px-3 py-2 rounded-xl text-xs font-medium border capitalize transition-all',
                            newEnergy === lvl
                              ? lvl === 'high'
                                ? 'bg-accent-danger/10 border-accent-danger text-accent-danger'
                                : lvl === 'medium'
                                ? 'bg-accent-warn/10 border-accent-warn text-accent-warn'
                                : 'bg-accent-info/10 border-accent-info text-accent-info'
                              : 'border-border-subtle hover:border-border-glow text-text-secondary'
                          )}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="label flex items-center justify-between">
                    <span>Target / Workspace URL (Optional)</span>
                    <span className="text-xs text-text-muted">Will auto-launch with task</span>
                  </label>
                  <input
                    type="url"
                    placeholder="e.g. https://github.com/my-project"
                    className="input"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                  />
                </div>

                <Button type="submit" variant="ghost" className="w-full border border-dashed border-border-glow hover:border-accent-primary">
                  + Add Sprint Task
                </Button>
              </form>
            </Card>
          </div>

          {/* Task blueprint overview */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold text-text-primary mb-1">Blueprint Preview</h2>
              <p className="text-sm text-text-secondary">Your schedule outline and parameters.</p>
            </div>

            <Card variant="glass" className="p-6 flex flex-col justify-between min-h-[320px]">
              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-text-secondary">Daily Load Tracker</span>
                    {draftTasks.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setDraftTasks([])}
                        className="text-xs text-accent-danger hover:underline font-medium"
                        aria-label="Clear all tasks"
                      >
                        (Clear All)
                      </button>
                    )}
                  </div>
                  <span className={cn(
                    'text-sm font-mono font-bold',
                    totalDraftMinutes > 360 ? 'text-accent-danger' : 'text-accent-primary'
                  )}>
                    {totalDraftMinutes} / 360 mins
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-bg-deep rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full transition-all duration-300',
                      totalDraftMinutes > 360 ? 'bg-accent-danger' : 'bg-accent-primary'
                    )}
                    style={{ width: `${Math.min(100, (totalDraftMinutes / 360) * 100)}%` }}
                  />
                </div>

                {totalDraftMinutes > 360 && (
                  <div className="p-3 bg-accent-danger/5 border border-accent-danger/20 rounded-xl flex gap-2 text-xs text-accent-danger">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>Cognitive Load Cap exceeded. Sprints exceeding 360 mins will be auto-rejected.</span>
                  </div>
                )}

                {/* List of draft tasks */}
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {draftTasks.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-border-subtle rounded-xl text-text-muted text-xs">
                      No tasks drafted yet. Use the form to assemble your sprints.
                    </div>
                  ) : (
                    draftTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 glass rounded-xl border border-border-subtle">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-text-primary truncate">{task.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono text-text-muted">{task.estimated_minutes} min</span>
                            <span className={cn(
                              'text-[9px] px-1.5 py-0.2 rounded border uppercase font-mono',
                              task.energy_level === 'high'
                                ? 'border-accent-danger/20 text-accent-danger'
                                : task.energy_level === 'medium'
                                ? 'border-accent-warn/20 text-accent-warn'
                                : 'border-accent-info/20 text-accent-info'
                            )}>
                              {task.energy_level}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveTask(task.id)}
                          className="text-text-muted hover:text-accent-danger p-1 rounded transition-colors"
                          aria-label={`Remove ${task.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full mt-6"
                disabled={draftTasks.length === 0}
                onClick={handleGeneratePlan}
                leftIcon={<Target className="h-5 w-5" />}
              >
                Compile Daily Battle Plan
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    if (focusMode && focusSeconds > 0) {
      const interval = setInterval(() => {
        setFocusSeconds((prev) => {
          if (prev <= 1) {
            handleFinishEarly();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [focusMode, focusSeconds]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

      if (event.key === ' ' || event.key === 'Enter') {
        if (focusMode) {
          event.preventDefault();
          handleFinishEarly();
        } else if (activeStepId) {
          event.preventDefault();
          handleFinishEarly();
        }
      } else if (event.key === 'Escape') {
        if (focusMode) {
          handleAbort();
        } else {
          setActiveStepId(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusMode, activeStepId, handleFinishEarly, handleAbort]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        totalPlannedMinutes={totalPlannedMinutes}
        rejectedCount={rejectedCount}
        onNewPlan={handleNewPlan}
        onViewRejected={handleViewRejected}
        onOpenSettings={handleOpenSettings}
      />

      <PlanView>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="text-center">
              <Loader2 className="h-10 w-10 text-accent-primary animate-spin mx-auto mb-4" aria-hidden="true" />
              <p className="text-text-secondary">Loading your plan...</p>
            </div>
          </div>
        ) : plan ? (
          <>
            <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="glass px-4 py-2 rounded-xl">
                  <span className="font-mono text-text-primary">{formatDate(planDate)}</span>
                </div>
                {plan.blocks.length > 0 && (
                  <span className="badge bg-accent-primary/10 text-accent-primary border-accent-primary/20 px-3 py-1 text-sm">
                    {plan.blocks.reduce((acc, b) => acc + b.steps.length, 0)} steps
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => refetch()} aria-label="Refresh plan">
                  <Loader2 className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="sm" className="text-accent-danger hover:text-accent-danger hover:bg-accent-danger/5" onClick={handleResetPlan} aria-label="Delete plan">
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {plan.advice && (
              <div className="mb-6 p-4 bg-accent-primary/5 border border-accent-primary/20 rounded-xl flex gap-3 text-sm animate-fade-in">
                <Brain className="h-5 w-5 text-accent-primary shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-text-primary mb-0.5">AI Coaching Advice</p>
                  <p className="text-text-secondary leading-relaxed">{plan.advice}</p>
                </div>
              </div>
            )}

            {plan.blocks.length === 0 ? (
              renderTaskIntake()
            ) : (
              <div className="space-y-5" role="list" aria-label="Time blocks">
                {plan.blocks.map((block) => (
                  <TimeBlock
                    key={block.id}
                    block={block}
                    activeStepId={activeStepId}
                    completedStepIds={completedStepIds}
                    onLaunchStep={handleLaunchStep}
                    onCompleteStep={handleCompleteStep}
                    onReopenStep={handleReopenStep}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          renderTaskIntake()
        )}
      </PlanView>

      <FooterFAB
        onClick={() => navigate('/tetris')}
        label="Calendar Tetris"
        icon={<Gamepad2 className="h-5 w-5" aria-hidden="true" />}
      />

      <FocusModeOverlay
        isOpen={focusMode}
        onClose={cleanupFocusMode}
        onFinishEarly={handleFinishEarly}
        onAbort={handleAbort}
        currentStep={focusStep}
        secondsRemaining={focusSeconds}
        onToggleFullscreen={() => {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            document.documentElement.requestFullscreen({ navigationUI: 'hide' });
          }
        }}
      />

      <RejectedTasksModal
        isOpen={showRejected}
        onClose={() => setShowRejected(false)}
        rejectedTasks={(rejectedData?.rejected_tasks ?? []).map(t => ({
          id: t.id,
          title: t.title,
          reason: t.description || 'Excluded from daily plan due to schedule constraints',
          energy_level: t.energy_level,
          estimated_minutes: t.estimated_minutes
        }))}
        onDismiss={handleDismissRejected}
      />

      <Toaster toasts={toasts} />
    </div>
  );
}