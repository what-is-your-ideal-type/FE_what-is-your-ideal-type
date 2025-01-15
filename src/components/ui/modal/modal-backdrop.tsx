import React from 'react';

export const ModalBackdrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black/50'
      role='dialog'
      aria-modal='true'
    >
      {children}
    </div>
  );
};
