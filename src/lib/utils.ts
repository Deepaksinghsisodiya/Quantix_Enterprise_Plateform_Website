import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes intelligently, removing duplicates and conflicts.
 * Accepts any number of Tailwind class strings, arrays, or objects.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
