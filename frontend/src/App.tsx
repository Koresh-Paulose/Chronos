import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUIStore } from '@/lib/store';
import { useAuth } from '@/components/auth/AuthProvider';
import { LandingPage } from '@/pages/LandingPage';
import { PlanPage } from '@/pages/PlanPage';
import { MuseumPage } from '@/pages/MuseumPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { TetrisPage } from '@/pages/TetrisPage';

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-deep">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" aria-hidden="true" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
}

function PublicGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-deep">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" aria-hidden="true" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/plan" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/landing" element={<PublicGate><LandingPage /></PublicGate>} />
      <Route
        path="/plan"
        element={
          <AuthGate>
            <PlanPage />
          </AuthGate>
        }
      />
      <Route
        path="/museum"
        element={
          <AuthGate>
            <MuseumPage />
          </AuthGate>
        }
      />
      <Route
        path="/settings"
        element={
          <AuthGate>
            <SettingsPage />
          </AuthGate>
        }
      />
      <Route
        path="/tetris"
        element={
          <AuthGate>
            <TetrisPage />
          </AuthGate>
        }
      />
      <Route path="/" element={<Navigate to="/plan" replace />} />
      <Route path="*" element={<Navigate to="/plan" replace />} />
    </Routes>
  );
}



function App() {
  const { theme } = useUIStore();

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = () => {
      const isDark =
        theme === 'dark' ||
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  return <AppRoutes />;
}

export default App;