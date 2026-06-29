import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Footer = forwardRef<HTMLDivElement, FooterProps>(
  ({ className, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn('border-t border-border-subtle py-8 px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
              <span className="font-display font-bold text-accent-primary">CR</span>
            </div>
            <span className="font-display font-semibold text-xl text-text-primary">Chronos</span>
          </div>
          <p className="text-sm text-text-muted">
            Built for humans who ship. Adversarial planning for the win.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-primary transition-colors" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-primary transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:hello@chronos.app" className="text-text-muted hover:text-accent-primary transition-colors" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border-subtle text-center text-sm text-text-muted">
          <p>© 2024 Chronos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
);

Footer.displayName = 'Footer';