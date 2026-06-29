import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { PlanView } from '@/components/plan/PlanView';
import { Card } from '@/components/ui/Card';
import { Clock, CheckCircle } from 'lucide-react';

export function MuseumPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-deep">
        <div className="h-8 w-8 text-accent-primary animate-spin" aria-hidden="true">
          <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" strokeLinejoin="round">
              <animateTransform attributeName="transform" type="rotate" dur="1s" from="0 12 12" to="360 12 12" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header totalPlannedMinutes={0} rejectedCount={0} onNewPlan={() => navigate('/plan')} onViewRejected={() => {}} onOpenSettings={() => navigate('/settings')} />

      <PlanView>
        <div className="text-center py-16">
          <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-accent-info/10 border border-accent-info/20 flex items-center justify-center">
            <Clock className="h-10 w-10 text-accent-info" aria-hidden="true" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-text-primary mb-2">Museum of Done</h2>
          <p className="text-text-secondary max-w-md mx-auto mb-8">
            Your completed sprints, archived forever. Every micro-step logged. Search, filter, and relive your victories.
          </p>
          <Card variant="glass" className="max-w-md mx-auto">
            <div className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-accent-primary mx-auto mb-4" aria-hidden="true" />
              <h3 className="font-display font-semibold text-text-primary mb-2">Coming Soon</h3>
              <p className="text-text-secondary mb-4">Infinite scroll log of every completed step with timestamps, durations, and energy levels.</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-display text-2xl font-bold text-accent-primary">0</p>
                  <p className="text-xs text-text-muted">Total Steps</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-accent-warn">0h</p>
                  <p className="text-xs text-text-muted">Focus Time</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-accent-info">0</p>
                  <p className="text-xs text-text-muted">Streaks</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </PlanView>
    </div>
  );
}