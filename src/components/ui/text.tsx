import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TextProps {
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  fontWeight?: 'normal' | 'bold' | 'medium' | 'light';
  color?: 'black' | 'red' | 'white' | 'main';
  className?: string;
  children?: React.ReactNode;
}

const colorMap: Record<NonNullable<TextProps['color']>, string> = {
  black: 'text-black',
  red: 'text-red',
  white: 'text-white',
  main: 'text-main',
};

const fontSizeMap: Record<NonNullable<TextProps['fontSize']>, string> = {
  xs: 'text-xs', // 12px
  sm: 'text-base', // 16px
  md: 'text-lg', // 18px
  lg: 'text-2xl', // 24px
  xl: 'text-3xl', // 30px
  xxl: 'text-4xl', // 36px
};

const fontWeightMap: Record<NonNullable<TextProps['fontWeight']>, string> = {
  normal: 'font-normal',
  bold: 'font-bold',
  medium: 'font-medium',
  light: 'font-light',
};

export const Text = ({
  fontSize = 'md',
  fontWeight = 'normal',
  color = 'black',
  className,
  children,
}: TextProps) => {
  const baseStyles = 'leading-normal';
  const conditionalStyles = clsx(
    fontSizeMap[fontSize],
    fontWeightMap[fontWeight],
    colorMap[color],
  );

  const classes = twMerge(baseStyles, conditionalStyles, className);

  return <p className={classes}>{children}</p>;
};
