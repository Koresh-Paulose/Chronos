import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Zap, Shield, Clock, Brain, ArrowRight, CheckCircle } from 'lucide-react';

interface HeroProps extends HTMLAttributes<HTMLDivElement> {
  onSignIn: () => void;
  onSignInIncognito: () => void;
  className?: string;
}

export const Hero = forwardRef<HTMLDivElement, HeroProps>(
  ({ onSignIn, onSignInIncognito, className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        'relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-grid grid opacity-5" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-radial from-accent-primary/5 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent-primary/10 blur-3xl animate-pulse-slow" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-info/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8 animate-fade-in">
          <span className="badge bg-accent-primary/10 text-accent-primary border-accent-primary/20 px-4 py-1.5 text-sm">
            <Zap className="h-3 w-3 mr-1.5" aria-hidden="true" />
            AI-Powered Adversarial Planning
          </span>
        </div>

        <h1 className="font-display text-display-xl sm:text-display-lg font-semibold text-text-primary mb-6 animate-slide-in">
          Stop Planning.<br />
          <span className="text-gradient">Start Executing.</span>
        </h1>

        <p className="text-body-lg text-text-secondary max-w-2xl mx-auto mb-10 animate-slide-in" style={{ animationDelay: '100ms' }}>
          Chronos breaks your tasks into micro-commitments you can&apos;t ignore.
          Time-blocked to your energy. Focus mode built-in. No more procrastination.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in" style={{ animationDelay: '200ms' }}>
          <Button
            variant="primary"
            size="lg"
            onClick={onSignIn}
            leftIcon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
            className="w-full sm:w-auto"
          >
            Sign in with Google
          </Button>
          <Button
            variant="glass"
            size="lg"
            onClick={onSignInIncognito}
            leftIcon={<Shield className="h-5 w-5" aria-hidden="true" />}
            className="w-full sm:w-auto text-accent-primary border-accent-primary/20 hover:border-accent-primary"
          >
            Go Incognito (Guest)
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
          {[
            { icon: Clock, title: 'Energy-Aware Scheduling', desc: 'Tasks aligned to your natural energy rhythms — deep work when you\'re sharp, admin when you\'re not.' },
            { icon: Brain, title: 'Adversarial Micro-Steps', desc: 'Every task broken into 5-15 min steps with reasons. Your brain can\'t argue with a 7-minute commitment.' },
            { icon: Shield, title: 'Built-in Focus Mode', desc: 'Fullscreen + Wake Lock + Timer. One click launches your sprint. Distractions locked out.' }
          ].map((feature, index) => (
            <div key={index} className="glass p-6 rounded-2xl text-left transition-all hover:border-border-glow">
              <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-accent-primary" aria-hidden="true" />
              </div>
              <h3 className="font-display font-semibold text-text-primary mb-2">{feature.title}</h3>
              <p className="text-text-secondary">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ArrowRight className="h-6 w-6 text-text-muted rotate-90" />
      </div>
    </section>
  )
);

Hero.displayName = 'Hero';