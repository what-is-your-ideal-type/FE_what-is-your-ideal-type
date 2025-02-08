import React from 'react';
import { twMerge } from 'tailwind-merge';

interface MainProps {
  className?: string;
  children: React.ReactNode;
}

export const Main = ({ className, children }: MainProps) => {
  return (
    <main
      className={twMerge(
        'flex flex-col gap-6 md:gap-24 items-center justify-center min-h-screen bg-white p-4',
        className,
      )}
    >
      {children}
    </main>
  );
};
