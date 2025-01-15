import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface MainProps {
  isMobile?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Main = ({ isMobile = false, className, children }: MainProps) => {
  // Main을 이 프로젝트 전체의 Layout으로 잡으셨는데, 이럴 경우에는 isMobile을 props로 받는것보다 내부에서 isMobile을 판단해보는게 어떨까요?
  // 그렇게 된다면 개발자가 일일히 props로 isMobile을 넘겨줄 필요가 없으니 더 편해질 것 같습니다.
  // 이곳에는 clsx와 twMerge를 동시에 사용하지 말고 하나만 사용해도 충분할 것 같습니다.

  return (
    <main
      className={twMerge(
        'flex items-center justify-center min-h-screen bg-white p-4',
        isMobile ? 'flex-col gap-6' : 'gap-24',
      )}
    >
      {children}
    </main>
  );
  return (
    <main
      className={clsx(
        'flex items-center justify-center min-h-screen bg-white p-4',
        isMobile ? 'flex-col gap-6' : 'gap-24',
        className,
      )}
    >
      {children}
    </main>
  );
};
