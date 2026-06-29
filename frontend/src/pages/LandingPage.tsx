import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { Hero } from '@/components/landing/Hero';
import { FeatureStrip } from '@/components/landing/FeatureStrip';
import { Footer } from '@/components/landing/Footer';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function LandingPage() {
  const { loading, signIn, signInIncognito } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signIn();
      navigate('/plan');
    } catch (e) {
      console.error("Sign in failed:", e);
    }
  };

  const handleSignInIncognito = async () => {
    try {
      await signInIncognito();
      navigate('/plan');
    } catch (e) {
      console.error("Guest mode failed:", e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-40 glass-border backdrop-blur-xl border-b px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
              <Zap className="h-5 w-5 text-accent-primary" aria-hidden="true" />
            </div>
            <span className="font-display font-semibold text-xl text-text-primary">Chronos</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-text-secondary hover:text-text-primary" onClick={handleSignInIncognito} disabled={loading}>
              Incognito (Guest)
            </Button>
            <Button variant="primary" size="sm" onClick={handleSignIn} disabled={loading}>
              Sign in with Google
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Hero onSignIn={handleSignIn} onSignInIncognito={handleSignInIncognito} />
        <FeatureStrip />
      </main>

      <Footer />
    </div>
  );
}