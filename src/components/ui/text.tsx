import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TextProps {
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  fontWeight?: 'normal' | 'bold' | 'medium' | 'light';
  color?: string; // e.g., Tailwind color classes or custom colors
  className?: string;
  children?: React.ReactNode;
}

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
  color = 'inherit',
  className,
  children,
}: TextProps) => {
  // 이 코드도 기본 스타일과 조건부 스타일을 나누어 진행하면 코드 가독성이 더 좋아질 것 같습니다!
  const baseStyles = 'leading-normal';
  const conditionalStyles = clsx(
    fontSizeMap[fontSize],
    fontWeightMap[fontWeight],
    color !== 'inherit' && `text-${color}`,
  );

  const classes = twMerge(baseStyles, conditionalStyles, className);

  return <p className={classes}>{children}</p>;
};
