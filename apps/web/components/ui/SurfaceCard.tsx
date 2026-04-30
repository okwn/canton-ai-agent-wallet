'use client';

import { cn } from '@/lib/utils';

interface SurfaceCardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function SurfaceCard({
  children,
  className,
  elevated = false,
  padding = 'md',
}: SurfaceCardProps) {
  return (
    <div
      className={cn(
        'bg-cream border border-light-cream rounded-lg',
        elevated && 'shadow-focus-warm',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

export default SurfaceCard;