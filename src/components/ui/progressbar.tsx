import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const ProgressBar = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  const containerClasses = twMerge(
    clsx('relative w-full h-2 rounded-full bg-gray-200 mb-20', className),
  );
  const progressClasses = twMerge(
    clsx('absolute top-0 left-0 h-full bg-main rounded-full transition-all'),
  );

  return (
    <div className={containerClasses}>
      <div className={progressClasses} style={{ width: `${value}%` }}></div>
    </div>
  );
};
