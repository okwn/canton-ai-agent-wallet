import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
  valueClassName?: string;
}

export function MetricCard({
  label,
  value,
  subtext,
  trend,
  className,
  valueClassName,
}: MetricCardProps) {
  return (
    <div className={cn('bg-elevated border border-border-default rounded-lg p-4', className)}>
      <p className="text-sm text-muted mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className={cn('text-2xl font-semibold text-foreground font-mono tracking-tight', valueClassName)}>
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              'text-xs font-medium',
              trend.positive ? 'text-success' : 'text-destructive'
            )}
          >
            {trend.positive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      {subtext && (
        <p className="text-xs text-muted mt-1">{subtext}</p>
      )}
    </div>
  );
}

export default MetricCard;
