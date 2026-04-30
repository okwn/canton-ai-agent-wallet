'use client';

import { cn } from '@/lib/utils';

interface BrandMarkProps {
  variant?: 'mark' | 'full';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Marcus BrandMark — warm, premium leaf logo
 */
export function BrandMark({
  variant = 'full',
  size = 'md',
  className,
}: BrandMarkProps) {
  const sizeClasses = {
    sm: { mark: 'w-6 h-6', text: 'text-sm', gap: 'gap-1.5' },
    md: { mark: 'w-8 h-8', text: 'text-base', gap: 'gap-2' },
    lg: { mark: 'w-10 h-10', text: 'text-lg', gap: 'gap-2.5' },
  };

  const s = sizeClasses[size];

  if (variant === 'mark') {
    return (
      <div className={cn(s.mark, 'flex items-center justify-center', className)}>
        <LeafIcon />
      </div>
    );
  }

  return (
    <div className={cn('flex items-center', s.gap, className)}>
      <div className={cn(s.mark, 'flex items-center justify-center flex-shrink-0')}>
        <LeafIcon />
      </div>
      <span className={cn(s.text, 'font-semibold text-charcoal tracking-tight')}>
        Marcus
      </span>
    </div>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path
        d="M8 24C8 24 10 16 16 12C22 8 26 6 26 6C26 6 26 10 24 14C22 18 18 22 16 24C14 26 12 26 10 26C8 26 8 24 8 24Z"
        fill="#4a7c39"
        fillOpacity="0.9"
      />
      <path
        d="M10 22C10 22 12 16 16 13C20 10 24 8 24 8"
        stroke="#4a7c39"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
      <path
        d="M8 24L6 26"
        stroke="#4a7c39"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
      <path
        d="M16 12C16 12 15 16 14 20C13 24 12 26 12 26"
        stroke="#4a7c39"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />
    </svg>
  );
}

export default BrandMark;