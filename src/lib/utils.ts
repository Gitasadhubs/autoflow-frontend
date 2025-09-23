import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date utilities
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
}

export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM dd, yyyy HH:mm');
}

export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

// Status badge utilities
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'success':
    case 'active':
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
    case 'building':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'failed':
    case 'error':
    case 'inactive':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function getStatusIcon(status: string): string {
  switch (status.toLowerCase()) {
    case 'success':
    case 'active':
    case 'completed':
      return '✅';
    case 'pending':
    case 'building':
      return '⏳';
    case 'failed':
    case 'error':
    case 'inactive':
      return '❌';
    default:
      return '⚪';
  }
}

// Framework icons
export function getFrameworkIcon(framework: string): string {
  switch (framework.toLowerCase()) {
    case 'react':
      return '⚛️';
    case 'vue':
      return '💚';
    case 'angular':
      return '🅰️';
    case 'nextjs':
      return '▲';
    case 'nuxtjs':
      return '💚';
    case 'svelte':
      return '🧡';
    case 'nodejs':
      return '💚';
    case 'express':
      return '🚂';
    case 'fastify':
      return '⚡';
    case 'static':
      return '📄';
    default:
      return '📦';
  }
}

// Truncate text
export function truncateText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Generate GitHub repository name from URL
export function getRepoNameFromUrl(url: string): string {
  try {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match) {
      return `${match[1]}/${match[2].replace('.git', '')}`;
    }
    return url;
  } catch {
    return url;
  }
}