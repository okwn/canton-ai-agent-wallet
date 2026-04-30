import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function microCCToDisplay(n: number | null | undefined): string {
  if (n === null || n === undefined) return '0.00';
  return (n / 1_000_000).toFixed(2);
}

export function bpsToPercent(bps: number): string {
  return (bps / 100).toFixed(2);
}

export function formatAddress(addr: string): string {
  if (addr.startsWith('0xDEMO')) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}
