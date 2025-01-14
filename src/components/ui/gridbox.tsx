import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GridBoxProps {
  children: React.ReactNode;
  className?: string;
}

export const GridBox = ({ children, className }: GridBoxProps) => {
  const gridClasses = twMerge(
    clsx('grid sm:grid-cols-2 gap-4', 'lg:grid-cols-4', className),
  );

  return <section className={gridClasses}>{children}</section>;
};
