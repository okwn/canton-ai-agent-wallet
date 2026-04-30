import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="w-10 h-10 rounded-lg bg-muted-surface flex items-center justify-center text-secondary">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-secondary leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard;
