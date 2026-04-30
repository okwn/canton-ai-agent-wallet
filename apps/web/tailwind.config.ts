import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Lovable Light Palette — Warm Parchment */

        /* Core */
        cream: {
          DEFAULT: '#f7f4ed',
          surface: '#f7f4ed',
          light: '#fcfbf8',
        },
        charcoal: {
          DEFAULT: '#1c1c1c',
          '83': 'rgba(28, 28, 28, 0.83)',
          '82': 'rgba(28, 28, 28, 0.82)',
          '40': 'rgba(28, 28, 28, 0.4)',
          '04': 'rgba(28, 28, 28, 0.04)',
          '03': 'rgba(28, 28, 28, 0.03)',
        },
        'muted-gray': '#5f5f5d',

        /* Borders */
        'light-cream': '#eceae4',

        /* Accent (warm green — used sparingly) */
        accent: {
          DEFAULT: '#4a7c39',
          light: '#5c943f',
          muted: 'rgba(74, 124, 57, 0.12)',
          subtle: 'rgba(74, 124, 57, 0.06)',
        },

        /* Semantic */
        success: '#16a34a',
        'success-bg': 'rgba(22, 163, 74, 0.1)',
        warning: '#d97706',
        'warning-bg': 'rgba(217, 119, 6, 0.1)',
        destructive: '#dc2626',
        'destructive-bg': 'rgba(220, 38, 38, 0.1)',
        info: '#2563eb',
        'info-bg': 'rgba(37, 99, 235, 0.1)',

        /* shadcn/ui legacy mapping */
        border: '#eceae4',
        background: '#f7f4ed',
        card: '#f7f4ed',
        'card-foreground': '#1c1c1c',
        primary: '#1c1c1c',
        'primary-foreground': '#fcfbf8',
        'muted-foreground': '#5f5f5d',
        'secondary-foreground': '#1c1c1c',
        'accent-foreground': '#1c1c1c',
        'destructive-foreground': '#fcfbf8',
      },
      borderRadius: {
        micro: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      boxShadow: {
        'inset': 'rgba(255, 255, 255, 0.2) 0px 0.5px 0px 0px inset, rgba(0, 0, 0, 0.2) 0px 0px 0px 0.5px inset, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
        'inset-hover': 'rgba(255, 255, 255, 0.3) 0px 0.5px 0px 0px inset, rgba(0, 0, 0, 0.25) 0px 0px 0px 0.5px inset, rgba(0, 0, 0, 0.08) 0px 1px 2px 0px',
        'focus': '0 0 0 3px rgba(59, 130, 246, 0.3)',
        'focus-sm': '0 0 0 2px rgba(59, 130, 246, 0.3)',
        'focus-warm': 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        'none': 'none',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      letterSpacing: {
        'tighter': '-1.5px',
        'tight': '-1.2px',
        'normal': '0',
      },
      lineHeight: {
        'tightest': '1.0',
        'tighter': '1.05',
        'relaxed': '1.38',
      },
      maxWidth: {
        'content': '1200px',
        'prose': '65ch',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 1.5s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;