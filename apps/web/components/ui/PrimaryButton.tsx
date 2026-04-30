'use client';

import { cn } from '@/lib/utils';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function PrimaryButton({
  children,
  className,
  size = 'md',
  ...props
}: PrimaryButtonProps) {
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
        'text-cream-light bg-charcoal',
        'transition-all duration-150',
        'hover:opacity-90',
        'active:opacity-80',
        'focus-visible:outline-none',
        sizeClasses[size],
        className
      )}
      style={{
        boxShadow: 'rgba(255, 255, 255, 0.2) 0px 0.5px 0px 0px inset, rgba(0, 0, 0, 0.2) 0px 0px 0px 0.5px inset, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;