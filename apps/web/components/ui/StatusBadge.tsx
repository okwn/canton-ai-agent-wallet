'use client';

import { cn } from '@/lib/utils';

type BadgeVariant = 'success' | 'warning' | 'error' | 'neutral' | 'info' | 'accent';

interface StatusBadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-success-bg text-success',
  warning: 'bg-warning-bg text-warning',
  error: 'bg-destructive-bg text-destructive',
  neutral: 'bg-charcoal-04 text-muted-gray',
  info: 'bg-info-bg text-info',
  accent: 'bg-accent-muted text-accent',
};

export function StatusBadge({
  variant = 'neutral',
  children,
  className,
  size = 'md',
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export default StatusBadge;