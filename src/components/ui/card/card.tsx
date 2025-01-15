import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
  children: React.ReactNode;
}

export const Card = ({ onClick, className, children }: CardProps) => {
  const classes = twMerge(
    clsx('w-56 flex-col mb-3 rounded-lg cursor-pointer', className),
  );

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};
