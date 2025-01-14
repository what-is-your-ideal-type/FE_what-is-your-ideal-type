import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const ButtonGroup = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const classes = twMerge(clsx('flex justify-center gap-3.5', className));

  return <section className={classes}>{children}</section>;
};
