import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FlexBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'column' | 'row';
  isResponsive?: boolean;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
}

const gapMap: Record<NonNullable<FlexBoxProps['gap']>, string> = {
  xs: 'gap-2', // 8px
  sm: 'gap-4', // 16px
  md: 'gap-8', // 32px
  lg: 'gap-16', // 64px
  xl: 'gap-24', // 96px
};

export const FlexBox = ({
  direction = 'row',
  isResponsive = false,
  gap,
  className,
  children,
  ...props
}: FlexBoxProps): JSX.Element => {
  const flexBoxClass = clsx(
    'flex',
    direction === 'column' ? 'flex-col' : 'flex-row',
    isResponsive && 'md:flex-row',
    gap && gapMap[gap],
    className,
  );

  return (
    // 추가적으로 받은 className들을 twMerge로 머지해도 좋을 것 같습니다!
    <section className={twMerge(flexBoxClass, className)} {...props}>
      {children}
    </section>
  );
};
