import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { signInWithGoogle } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

interface AuthGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGate({ children, fallback }: AuthGateProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-deep">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-accent-primary animate-spin mx-auto mb-4" aria-hidden="true" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        {fallback || (
          <div className="w-full max-w-md">
            <div className="glass p-8 rounded-2xl text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-accent-primary" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-text-primary mb-2">
                Welcome to Chronos
              </h2>
              <p className="text-text-secondary mb-8">
                Sign in to start generating battle plans that force action.
              </p>
              <Button
                variant="primary"
                size="lg"
                className="w-full mb-4"
                onClick={signInWithGoogle}
              >
                Sign in with Google
              </Button>
              <p className="text-xs text-text-muted mt-6">
                By signing in, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
}