import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps {
  label?: string;
  bgColor?: 'main' | 'sub' | 'white' | 'disabled' | 'underline' | 'transparent';
  children?: React.ReactNode;
  onClick?: (e: React.FormEvent) => void;
  disabled?: boolean;
  className?: string;
}
export const Button = ({
  children,
  label,
  bgColor = 'main',
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const ariaLabel = typeof children === 'string' ? children : label;

  const classes = twMerge(
    clsx(
      'leading-none transition duration-200 ease-in-out cursor-pointer',
      bgColor === 'transparent'
        ? 'ml-auto opacity-70'
        : bgColor === 'underline'
          ? 'text-main border-solid border-b border-main bg-transparent hover:text-main-hover'
          : 'text-base text-white font-medium rounded-lg border-none',
      {
        'bg-main hover:bg-main-hover': bgColor === 'main' && !disabled,
        'bg-sub hover:bg-sub-hover': bgColor === 'sub' && !disabled,
        'bg-white hover:bg-white-hover text-black':
          bgColor === 'white' && !disabled,
        'bg-disabled cursor-not-allowed': bgColor === 'disabled' || disabled,
      },
      {
        'p-2.5': typeof children === 'string',
      },
    ),
    className,
  );

  return (
    <button
      aria-label={ariaLabel}
      role='button'
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
