import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { PlanView } from '@/components/plan/PlanView';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useUIStore } from '@/lib/store';
import { Moon, Sun, Monitor, Bell, Trash2, User } from 'lucide-react';
import { signOutUser, hasFirebaseConfig } from '@/lib/firebase';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

export function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme, workPreferences, setWorkPreferences } = useUIStore();
  const { toast, toasts, Toaster } = useToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  if (!user) return null;



  const handleDeleteAccount = async () => {
    try {
      if (hasFirebaseConfig) {
        await fetch('/api/user/delete', { method: 'DELETE' });
      } else {
        // Local storage fallback: clear all chronos local data
        const keys = Object.keys(localStorage).filter(k => k.startsWith('chronos-'));
        keys.forEach(k => localStorage.removeItem(k));
      }
      await signOutUser();
      toast({ title: 'Account Deleted', description: 'Your account has been permanently deleted', variant: 'success' });
    } catch {
      toast({ title: 'Delete Failed', description: 'Could not delete account', variant: 'danger' });
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header totalPlannedMinutes={0} rejectedCount={0} onNewPlan={() => {}} onViewRejected={() => {}} onOpenSettings={() => {}} />

      <PlanView>
        <div className="space-y-6 max-w-2xl">
          <div>
            <h1 className="font-display text-2xl font-semibold text-text-primary mb-2">Settings</h1>
            <p className="text-text-secondary">Manage your Chronos preferences</p>
          </div>

          <Card variant="glass">
            <div className="p-5 border-b border-border-subtle">
              <h2 className="font-display font-medium text-text-primary">Appearance</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="label">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'system', label: 'System', icon: Monitor },
                    { value: 'light', label: 'Light', icon: Sun },
                    { value: 'dark', label: 'Dark', icon: Moon }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value as 'system' | 'light' | 'dark')}
                      className={cn(
                        'glass p-4 rounded-xl text-left transition-all',
                        theme === option.value
                          ? 'border-accent-primary/50 bg-accent-primary/5'
                          : 'border-border-subtle hover:border-border-glow'
                      )}
                    >
                      <option.icon className="h-5 w-5 text-text-secondary mb-2" aria-hidden="true" />
                      <span className="font-medium text-text-primary">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card variant="glass">
            <div className="p-5 border-b border-border-subtle">
              <h2 className="font-display font-medium text-text-primary">Work Preferences</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Work Start Time</label>
                  <input
                    type="time"
                    className="input font-mono"
                    value={workPreferences.workStart}
                    onChange={(e) => setWorkPreferences({ workStart: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Work End Time</label>
                  <input
                    type="time"
                    className="input font-mono"
                    value={workPreferences.workEnd}
                    onChange={(e) => setWorkPreferences({ workEnd: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Default Break Duration (minutes)</label>
                  <input
                    type="number"
                    min="5"
                    max="60"
                    step="5"
                    className="input"
                    value={workPreferences.breakDuration}
                    onChange={(e) => setWorkPreferences({ breakDuration: parseInt(e.target.value) || 15 })}
                  />
                </div>
                <div>
                  <label className="label">Max Deep Work Block (minutes)</label>
                  <input
                    type="number"
                    min="30"
                    max="240"
                    step="15"
                    className="input"
                    value={workPreferences.maxDeepWorkBlock}
                    onChange={(e) => setWorkPreferences({ maxDeepWorkBlock: parseInt(e.target.value) || 90 })}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card variant="glass">
            <div className="p-5 border-b border-border-subtle">
              <h2 className="font-display font-medium text-text-primary">Notifications</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">Push Notifications</p>
                  <p className="text-sm text-text-secondary">Receive sprint start/end notifications</p>
                </div>
                <Button
                  variant={notificationsEnabled ? 'success' : 'ghost'}
                  size="sm"
                  onClick={async () => {
                    const perm = await Notification.requestPermission();
                    setNotificationsEnabled(perm === 'granted');
                    toast({
                      title: perm === 'granted' ? 'Enabled' : 'Permission Denied',
                      description: perm === 'granted' ? 'You will receive notifications' : 'Enable in browser settings',
                      variant: perm === 'granted' ? 'success' : 'warning'
                    });
                  }}
                >
                  {notificationsEnabled ? 'Enabled' : 'Enable'}
                </Button>
              </div>
            </div>
          </Card>



          <Card variant="glass">
            <div className="p-5 border-b border-border-subtle">
              <h2 className="font-display font-medium text-text-primary">Account</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-accent-primary" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{user.displayName ?? 'User'}</p>
                  <p className="text-sm text-text-secondary">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">Sign Out</p>
                  <p className="text-sm text-text-secondary">Sign out of your Chronos account</p>
                </div>
                <Button variant="ghost" size="sm" onClick={async () => { await signOutUser(); }}>
                  Sign Out
                </Button>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                <div>
                  <p className="font-medium text-accent-danger">Delete Account</p>
                  <p className="text-sm text-text-secondary">Permanently delete your account and all data</p>
                </div>
                <Button variant="danger" size="sm" onClick={() => setShowDeleteModal(true)}>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </PlanView>



      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
        description="This action is irreversible. All your plans, history, and data will be permanently deleted."
        size="sm"
      >
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteAccount} leftIcon={<Trash2 className="h-4 w-4" />}>
            Delete Account
          </Button>
        </div>
      </Modal>

      <Toaster toasts={toasts} />
    </div>
  );
}