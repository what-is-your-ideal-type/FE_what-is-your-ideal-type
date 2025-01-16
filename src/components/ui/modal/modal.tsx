import React from 'react';
import { ModalBackdrop } from './modal-backdrop';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  isSending: boolean;
  onClose: () => void;
  onClick: () => void;
  children?: React.ReactNode;
}

const Modal = ({
  title,
  description,
  isOpen,
  isSending,
  onClose,
  onClick,
  children,
}: ModalProps): JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        <h2 className='font-bold text-xl'>{title}</h2>
        <p className='mx-4'>{description}</p>
        {children}
        <ModalFooter
          isSending={isSending}
          onClose={onClose}
          onClick={onClick}
        />
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;
