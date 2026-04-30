'use client';

import { cn } from '@/lib/utils';

interface GhostButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function GhostButton({
  children,
  className,
  size = 'md',
  ...props
}: GhostButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'rounded-sm font-medium',
        'text-charcoal bg-transparent',
        'transition-all duration-150',
        'hover:bg-charcoal-04',
        'active:opacity-80',
        'focus-visible:outline-none',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default GhostButton;