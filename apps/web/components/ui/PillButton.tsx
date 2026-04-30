import { cn } from '@/lib/utils';

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

export function PillButton({
  children,
  className,
  active = false,
  ...props
}: PillButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'rounded-full font-medium text-sm',
        'transition-all duration-150',
        'bg-muted-surface text-secondary',
        active ? 'opacity-100 text-foreground' : 'opacity-70 hover:opacity-100 hover:text-foreground',
        'active:opacity-80',
        'focus-visible:outline-none focus-visible:ring-0 shadow-focus-sm',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default PillButton;
