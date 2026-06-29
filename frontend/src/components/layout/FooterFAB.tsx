import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

interface FooterFABProps extends HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  label?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const FooterFAB = forwardRef<HTMLButtonElement, FooterFABProps>(
  ({ onClick, label = 'New Plan', className, icon, ...props }, ref) => (
    <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-30" role="region" aria-label="Primary actions">
      <Button
        ref={ref}
        variant="primary"
        size="lg"
        onClick={onClick}
        leftIcon={icon || <Plus className="h-5 w-5" aria-hidden="true" />}
        className={cn(
          'shadow-glow-lg animate-scale-in hover:shadow-[0_0_30px_rgba(0,229,160,0.3)]',
          className
        )}
        {...props}
      >
        {label}
      </Button>
    </div>
  )
);

FooterFAB.displayName = 'FooterFAB';