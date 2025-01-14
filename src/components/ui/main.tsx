import React from 'react';
import clsx from 'clsx';
import {twMerge} from 'tailwind-merge';

interface MainProps {
  isMobile?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Main = ({isMobile = false, className, children}: MainProps) => {
  const classes = twMerge(
    clsx(
      'flex items-center justify-center min-h-screen bg-white p-4',
      isMobile ? 'flex-col gap-6' : 'gap-24',
    ),
    className,
  );

  return <main className={classes}>{children}</main>;
};
