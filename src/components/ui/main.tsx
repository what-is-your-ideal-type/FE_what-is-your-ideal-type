import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface MainProps {
  isResponsive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Main = ({
  isResponsive = false,
  className,
  children,
}: MainProps) => {
  const baseStyles =
    'flex flex-col gap-6 md:gap-24 items-center justify-center min-h-screen bg-white p-4';
  const conditionalStyles = clsx(isResponsive && 'md:flex-row');
  const classes = twMerge(baseStyles, conditionalStyles, className);

  return <main className={classes}>{children}</main>;
};
