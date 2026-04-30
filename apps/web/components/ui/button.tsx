import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-sm text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-foreground text-page hover:bg-foreground-90 active:opacity-80',
        secondary: 'bg-muted-surface text-foreground hover:bg-muted-surface-hover border border-border-interactive hover:border-border-interactive-hover',
        ghost: 'bg-transparent text-secondary hover:bg-foreground-5 hover:text-foreground',
        outline: 'bg-transparent text-foreground border border-border-interactive hover:bg-foreground-5',
        destructive: 'bg-destructive text-page hover:bg-destructive/90 active:opacity-80',
        accent: 'bg-accent text-page hover:bg-accent-hover active:opacity-80',
      },
      size: {
        default: 'h-10 px-5 py-2.5',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
