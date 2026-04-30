'use client';

import { cn } from '@/lib/utils';

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'page' | 'elevated' | 'muted';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const paddingClasses = {
  none: '',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-20',
  '2xl': 'py-24',
};

export function PageSection({
  children,
  className,
  id,
  background = 'page',
  padding = 'lg',
}: PageSectionProps) {
  const bgClasses = {
    page: 'bg-page',
    elevated: 'bg-elevated',
    muted: 'bg-muted-surface',
  };

  return (
    <section
      id={id}
      className={cn(
        bgClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      <div className="max-w-content mx-auto px-6">
        {children}
      </div>
    </section>
  );
}

export default PageSection;
