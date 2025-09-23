import React from 'react';
import { cn, getStatusColor, getStatusIcon } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  status?: string;
  children: React.ReactNode;
}

export default function Badge({
  variant = 'default',
  status,
  className,
  children,
  ...props
}: BadgeProps) {
  const baseStyles = 'badge';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
  };

  // If status is provided, use the utility function to get colors
  const statusColor = status ? getStatusColor(status) : variants[variant];
  const statusIcon = status ? getStatusIcon(status) : null;

  return (
    <span
      className={cn(
        baseStyles,
        statusColor,
        className
      )}
      {...props}
    >
      {statusIcon && <span className="mr-1">{statusIcon}</span>}
      {children}
    </span>
  );
}