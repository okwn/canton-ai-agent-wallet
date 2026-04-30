import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center rounded-full font-medium', {
  variants: {
    variant: {
      default: 'bg-foreground-10 text-foreground',
      success: 'bg-success-bg text-success',
      warning: 'bg-warning-bg text-warning',
      destructive: 'bg-destructive-bg text-destructive',
      secondary: 'bg-muted-surface text-secondary',
      info: 'bg-info-bg text-info',
      accent: 'bg-accent-muted text-accent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
