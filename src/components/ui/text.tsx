import React from 'react';
import clsx from 'clsx';
import {twMerge} from 'tailwind-merge';

interface TextProps {
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  fontWeight?: string;
  color?: string;
  className?: string;
  children: React.ReactNode;
}
const fontSizeMap: Record<NonNullable<TextProps['fontSize']>, string> = {
  xs: 'text-xs', // 12px
  sm: 'text-base', // 16px
  md: 'text-lg', // 18px
  lg: 'text-2xl', // 24px
  xl: 'text-3xl', // 30px
  xxl: 'text-4xl', // 36px
};
export const Text = ({
  fontSize = 'md',
  fontWeight = 'normal',
  color = 'inherit',
  className,
  children,
}: TextProps) => {
  const classes = twMerge(
    clsx(
      fontSize && fontSizeMap[fontSize],
      fontWeight !== 'normal' && `font-${fontWeight}`,
      color !== 'inherit' && `text-${color}`,
    ),
    className,
  );

  return <p className={classes}>{children}</p>;
};
