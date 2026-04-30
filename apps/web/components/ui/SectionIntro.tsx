import { cn } from '@/lib/utils';

interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  centered = false,
  className,
  titleClassName,
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        centered ? 'text-center max-w-prose mx-auto' : 'max-w-2xl',
        'mb-12',
        className
      )}
    >
      {eyebrow && (
        <p className="text-sm font-medium text-muted uppercase tracking-wide mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'text-3xl font-semibold text-foreground tracking-tight',
          'md:text-section-heading',
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn(
          'mt-4 text-base text-secondary leading-relaxed',
          centered && 'mx-auto'
        )}>
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionIntro;
