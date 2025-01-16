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
  // 여기서는 조건부로 스타일을 결정할 요소가 보이지 않아 className을 props로 넘겨주면 바로 merge시켜서 스타일을 적용해도 좋을 것 같습니다!
  return (
    <section className={twMerge('flex justify-center gap-3.5', className)}>
      {children}
    </section>
  );
};
