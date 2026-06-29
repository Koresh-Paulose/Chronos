import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Menu, LogOut, Settings, Sun, Moon, Monitor, Target, Clock } from 'lucide-react';
import { useUIStore } from '@/lib/store';
import { useAuth } from '@/components/auth/AuthProvider';
import { Modal } from '@/components/ui/Modal';
import { signOutUser } from '@/lib/firebase';

interface HeaderProps {
  totalPlannedMinutes?: number;
  rejectedCount?: number;
  onNewPlan?: () => void;
  onViewRejected?: () => void;
  onOpenSettings?: () => void;
}

export function Header({
  totalPlannedMinutes = 0,
  rejectedCount = 0,
  onNewPlan,
  onViewRejected,
  onOpenSettings,
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme, sidebarOpen, toggleSidebar } = useUIStore();
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTotalTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 glass-border backdrop-blur-xl border-b',
        'px-4 sm:px-6 lg:px-8'
      )}
    >
      <div className="flex items-center justify-between h-16 gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>

          <button
            onClick={() => navigate('/plan')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            aria-label="Chronos home"
          >
            <span className="font-display font-semibold text-xl text-text-primary hidden sm:block">
              Chronos
            </span>
            <span className="font-display font-semibold text-lg text-text-primary sm:hidden">
              CR
            </span>
          </button>

          <div className="hidden md:flex items-center gap-4 px-3 py-1.5 glass rounded-xl">
            <span className="text-sm font-mono text-text-primary">
              {formatTotalTime(totalPlannedMinutes)}
            </span>
            {rejectedCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onViewRejected}
                className="text-accent-danger hover:text-accent-danger"
                aria-label={`${rejectedCount} rejected tasks`}
              >
                <span className="flex items-center gap-1">
                  Rejected
                  <span className="badge bg-accent-danger/10 text-accent-danger border-accent-danger/20 px-1.5 py-0">
                    {rejectedCount}
                  </span>
                </span>
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tetris')}
            aria-label="Play Calendar Tetris"
            className="hidden sm:flex border border-border-glow text-accent-primary hover:bg-accent-primary/5 gap-2"
          >
            <span>🎮</span>
            <span>Calendar Tetris</span>
          </Button>

          <div className="relative" ref={themeMenuRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              aria-label="Change theme"
              aria-expanded={showThemeMenu}
              aria-haspopup="menu"
            >
              {theme === 'dark' ? <Moon className="h-5 w-5" /> : theme === 'light' ? <Sun className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
            </Button>
            {showThemeMenu && (
              <div className="absolute right-0 top-full mt-2 glass rounded-xl shadow-glow-lg py-1 w-40 z-50 animate-scale-in">
                <button
                  onClick={() => { setTheme('system'); setShowThemeMenu(false); }}
                  className={cn('w-full px-3 py-2 text-left text-sm flex items-center gap-2', theme === 'system' && 'bg-accent-primary/10 text-accent-primary')}
                >
                  <Monitor className="h-4 w-4" />
                  System
                </button>
                <button
                  onClick={() => { setTheme('light'); setShowThemeMenu(false); }}
                  className={cn('w-full px-3 py-2 text-left text-sm flex items-center gap-2', theme === 'light' && 'bg-accent-primary/10 text-accent-primary')}
                >
                  <Sun className="h-4 w-4" />
                  Light
                </button>
                <button
                  onClick={() => { setTheme('dark'); setShowThemeMenu(false); }}
                  className={cn('w-full px-3 py-2 text-left text-sm flex items-center gap-2', theme === 'dark' && 'bg-accent-primary/10 text-accent-primary')}
                >
                  <Moon className="h-4 w-4" />
                  Dark
                </button>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSettings}
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" aria-hidden="true" />
          </Button>

          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-bg-card transition-colors"
              aria-label="User menu"
              aria-expanded={showUserMenu}
              aria-haspopup="menu"
            >
              <Avatar size="sm" name={user?.displayName ?? 'User'} src={user?.photoURL ?? undefined} />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 glass rounded-xl shadow-glow-lg py-1 w-44 z-50 animate-scale-in">
                <div className="px-3 py-2 border-b border-border-subtle">
                  <p className="text-sm font-medium text-text-primary">{user?.displayName ?? 'User'}</p>
                  <p className="text-xs text-text-muted truncate">{user?.email}</p>
                </div>
                <button
                  onClick={onOpenSettings}
                  className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-bg-card rounded-none"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button
                  onClick={async () => { await signOut(); }}
                  className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-bg-card rounded-none text-accent-danger"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-out Sidebar Drawer */}
      <div className={cn("fixed inset-0 z-50 transition-all duration-300", sidebarOpen ? "visible opacity-100" : "invisible opacity-0")}>
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-bg-deep/60 backdrop-blur-sm" onClick={toggleSidebar} />
        
        {/* Sidebar content container */}
        <div className={cn(
          "absolute inset-y-0 left-0 w-72 bg-bg-card/90 backdrop-blur-2xl border-r border-border-subtle p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                  <span className="font-display font-bold text-accent-primary">CR</span>
                </div>
                <span className="font-display font-semibold text-xl text-text-primary">Chronos</span>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-text-muted hover:text-text-primary">
                <span className="text-xl">×</span>
              </Button>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => { navigate('/plan'); toggleSidebar(); }}
                className={cn(
                  "w-full px-4 py-3 rounded-xl flex items-center gap-3 text-left transition-all",
                  location.pathname === '/plan' ? "bg-accent-primary/10 text-accent-primary font-medium border border-accent-primary/20" : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
                )}
              >
                <Target className="h-5 w-5" />
                Plan Dashboard
              </button>
              <button
                onClick={() => { navigate('/museum'); toggleSidebar(); }}
                className={cn(
                  "w-full px-4 py-3 rounded-xl flex items-center gap-3 text-left transition-all",
                  location.pathname === '/museum' ? "bg-accent-primary/10 text-accent-primary font-medium border border-accent-primary/20" : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
                )}
              >
                <Clock className="h-5 w-5" />
                Museum of Done
              </button>
              <button
                onClick={() => { navigate('/settings'); toggleSidebar(); }}
                className={cn(
                  "w-full px-4 py-3 rounded-xl flex items-center gap-3 text-left transition-all",
                  location.pathname === '/settings' ? "bg-accent-primary/10 text-accent-primary font-medium border border-accent-primary/20" : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
                )}
              >
                <Settings className="h-5 w-5" />
                Settings
              </button>
              <button
                onClick={() => { navigate('/tetris'); toggleSidebar(); }}
                className={cn(
                  "w-full px-4 py-3 rounded-xl flex items-center gap-3 text-left transition-all",
                  location.pathname === '/tetris' ? "bg-accent-primary/10 text-accent-primary font-medium border border-accent-primary/20" : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
                )}
              >
                <span className="text-xl">🎮</span>
                Calendar Tetris
              </button>
            </nav>
          </div>

          <div className="pt-4 border-t border-border-subtle space-y-4">
            <div className="flex items-center gap-3 px-2">
              <Avatar size="sm" name={user?.displayName ?? 'User'} src={user?.photoURL ?? undefined} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text-primary truncate">{user?.displayName ?? 'User'}</p>
                <p className="text-xs text-text-muted truncate">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-accent-danger hover:text-accent-danger hover:bg-accent-danger/5 gap-3"
              leftIcon={<LogOut className="h-5 w-5" />}
              onClick={async () => { await signOut(); toggleSidebar(); }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}