// Shared utilities for agent-core
// (Duplicated from apps/web/lib/utils.ts to avoid cross-package import issues)

export function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function microCCToDisplay(n: number | null): string {
  if (n === null) return 'N/A';
  return (n / 1_000_000).toFixed(2);
}

export function bpsToPercent(bps: number): string {
  return (bps / 100).toFixed(2);
}

export function formatAddress(address: string | null, chars = 4): string {
  if (!address) return 'Not connected';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
