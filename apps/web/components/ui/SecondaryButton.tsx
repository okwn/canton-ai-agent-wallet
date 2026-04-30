'use client';

import { cn } from '@/lib/utils';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function SecondaryButton({
  children,
  className,
  size = 'md',
  ...props
}: SecondaryButtonProps) {
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
        'border border-charcoal-40',
        'transition-all duration-150',
        'hover:border-charcoal-83 hover:bg-charcoal-04',
        'active:opacity-80',
        'focus-visible:outline-none',
        sizeClasses[size],
        className
      )}
      style={{
        boxShadow: 'none',
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;