import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Zap, Target, Clock, Brain, Shield, CheckCircle, ArrowRight, BarChart, Moon, Sun, Layers } from 'lucide-react';

interface FeatureStripProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const features = [
  {
    icon: Target,
    title: 'Adversarial Planning',
    desc: 'AI argues with your task list. Only the essential survives. Rejected tasks shown with reasons.',
    highlight: 'Rejection Log'
  },
  {
    icon: Clock,
    title: 'Energy-Aware Time Blocking',
    desc: 'Morning deep work. Afternoon admin. Evening light tasks. Your calendar matches your biology.',
    highlight: 'Chronotype Sync'
  },
  {
    icon: Brain,
    title: 'Micro-Commitment Engine',
    desc: 'Every step 5-15 minutes. Reason included. Deep link ready. Your brain says "I can do 7 minutes".',
    highlight: '5-15 min steps'
  },
  {
    icon: Shield,
    title: 'Focus Mode Lock-In',
    desc: 'One click: fullscreen, wake lock, timer, notification. Distractions physically impossible.',
    highlight: 'Zero Distractions'
  },
  {
    icon: BarChart,
    title: 'Museum of Done',
    desc: 'Every completed step logged forever. Searchable. Filterable. Proof you ship.',
    highlight: 'Infinite Log'
  },
  {
    icon: Layers,
    title: 'Multi-Source Ingestion',
    desc: 'Calendar, Email, Slack, Notion, Manual. One inbox. One plan. Zero context switching.',
    highlight: 'Unified Input'
  }
];

export const FeatureStrip = forwardRef<HTMLDivElement, FeatureStripProps>(
  ({ className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn('py-20 px-4 sm:px-6 lg:px-8 bg-bg-card/50', className)}
      {...props}
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-display-sm font-semibold text-text-primary mb-4">
            Engineered for <span className="text-gradient">Execution</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Six pillars that transform intention into action. No fluff. No gamification. Just results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <article
              key={index}
              className="group glass p-6 rounded-2xl hover:border-border-glow hover:shadow-glow-lg transition-all duration-smooth"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-accent-primary" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-text-secondary text-sm mb-3">{feature.desc}</p>
                  <span className="badge bg-accent-primary/10 text-accent-primary border-accent-primary/20 text-xs">
                    {feature.highlight}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
);

FeatureStrip.displayName = 'FeatureStrip';