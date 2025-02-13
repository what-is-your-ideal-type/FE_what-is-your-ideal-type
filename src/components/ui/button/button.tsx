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
  bgColor = 'transparent',
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const ariaLabel = typeof children === 'string' ? children : label;

  // 기본 스타일
  const baseStyles =
    'leading-none transition duration-200 ease-in-out cursor-pointer rounded-lg text-black';

  // 배경 스타일
  const bgColorStyles = {
    transparent: 'ml-auto opacity-70',
    underline:
      'rounded-none text-main border-solid border-b border-main bg-transparent hover:text-main-hover',
    main: !disabled ? 'bg-main hover:bg-main-hover text-white' : '',
    sub: !disabled ? 'bg-sub hover:bg-main hover:text-white text-main' : '',
    white: !disabled ? 'bg-white hover:bg-white-hover' : '',
    disabled: 'bg-disabled cursor-not-allowed',
  };

  // 추가 조건부 스타일
  const conditionalStyles = {
    'p-2.5': typeof children === 'string',
  };

  const classes = twMerge(
    clsx(baseStyles, bgColorStyles[bgColor], conditionalStyles),
    className, // 외부에서 전달된 추가 클래스
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
