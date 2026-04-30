import { cn } from '@/lib/utils';

interface LoadingStateProps {
  className?: string;
  rows?: number;
  variant?: 'card' | 'list' | 'inline';
}

export function LoadingState({
  className,
  rows = 3,
  variant = 'card',
}: LoadingStateProps) {
  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="w-4 h-4 rounded-full bg-cream-light animate-pulse-subtle" />
        <div className="h-4 w-24 bg-cream-light rounded animate-pulse-subtle" />
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 bg-cream border border-cream-light rounded-lg"
          >
            <div className="w-8 h-8 rounded bg-cream-light animate-pulse-subtle" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-cream-light rounded animate-pulse-subtle" />
              <div className="h-3 w-1/2 bg-cream-light rounded animate-pulse-subtle" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-24 bg-cream border border-cream-light rounded-lg animate-pulse-subtle"
        />
      ))}
    </div>
  );
}
