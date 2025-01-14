import React from 'react';

export const ModalContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative flex flex-col items-center justify-center gap-6 w-[90%] max-w-md bg-white rounded-lg p-8 text-center shadow-lg'>
      {children}
    </div>
  );
};
