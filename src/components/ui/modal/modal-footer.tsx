import React from 'react';
import { Button } from '../button/button';

interface ModalFooterProps {
  isSending: boolean;
  onClose: () => void;
  onClick: () => void;
}

export const ModalFooter = ({
  isSending,
  onClose,
  onClick,
}: ModalFooterProps) => {
  return (
    <div className='flex gap-4 mt-5'>
      <Button className='py-2 px-4' onClick={onClick} disabled={isSending}>
        {isSending ? '메일 전송 중...' : '메일 발송'}
      </Button>
      <Button
        className='py-2 px-4 bg-sub hover:bg-sub-hover text-main'
        onClick={onClose}
      >
        닫기
      </Button>
    </div>
  );
};
