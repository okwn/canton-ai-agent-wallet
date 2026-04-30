import { cn } from '@/lib/utils';
import { SecondaryButton } from './SecondaryButton';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-12 px-4',
        className
      )}
    >
      {icon && (
        <div className="w-12 h-12 rounded-full bg-cream-light flex items-center justify-center mb-4 text-muted opacity-50">
          {icon}
        </div>
      )}
      <h3 className="text-base font-medium text-charcoal mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted max-w-sm">{description}</p>
      )}
      {action && (
        <SecondaryButton
          onClick={action.onClick}
          className="mt-4"
          size="sm"
        >
          {action.label}
        </SecondaryButton>
      )}
    </div>
  );
}
