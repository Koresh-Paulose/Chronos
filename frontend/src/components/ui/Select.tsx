import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  placeholder,
  options,
  value,
  onChange,
  error,
  disabled,
  className
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className={cn('relative', className)}>
      {label && <label className="label">{label}</label>}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'input w-full text-left justify-between',
          error && 'input-error',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
      >
        <span className={cn('truncate', !value && 'text-text-muted')}>
          {value ? options.find((o) => o.value === value)?.label : placeholder}
        </span>
        <ChevronDown className={cn('h-4 w-4 text-text-muted flex-shrink-0 transition-transform', isOpen && 'rotate-180')} aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1.5 glass rounded-xl shadow-glow-lg overflow-hidden animate-scale-in">
          <ul role="listbox" aria-label={label}>
            {options.map((option) => (
              <li key={option.value} role="option" aria-selected={value === option.value}>
                <button
                  type="button"
                  onClick={() => { onChange?.(option.value); setIsOpen(false); }}
                  className={cn(
                    'w-full px-4 py-2.5 text-left transition-colors',
                    value === option.value
                      ? 'bg-accent-primary/10 text-accent-primary'
                      : 'text-text-primary hover:bg-bg-card'
                  )}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className="mt-1.5 text-sm text-accent-danger" role="alert">{error}</p>}
    </div>
  );
}