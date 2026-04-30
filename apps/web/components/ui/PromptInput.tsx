import { cn } from '@/lib/utils';

interface PromptInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  suggestionPills?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

export function PromptInput({
  label,
  suggestionPills,
  onSuggestionClick,
  className,
  ...props
}: PromptInputProps) {
  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-charcoal">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full min-h-[100px] p-4',
          'bg-cream border border-cream-light rounded-lg',
          'text-charcoal placeholder:text-muted',
          'resize-none',
          'focus:outline-none focus:border-charcoal-40 focus:shadow-focus',
          'transition-all duration-150',
          className
        )}
        {...props}
      />
      {suggestionPills && suggestionPills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestionPills.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSuggestionClick?.(suggestion)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-full',
                'bg-cream border border-cream-light text-charcoal-82',
                'hover:border-charcoal-40 hover:text-charcoal',
                'transition-all duration-150 opacity-70 hover:opacity-100'
              )}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
