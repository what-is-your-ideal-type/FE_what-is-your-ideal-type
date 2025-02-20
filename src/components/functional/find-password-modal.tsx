import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import Input from '../ui/input';
import Modal from '../ui/modal/modal';
import { Text } from '../ui/text';
import { useForm } from 'react-hook-form';

interface FindPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FindPasswordModal = ({ isOpen, onClose }: FindPasswordModalProps) => {
  const { register, getValues, formState: { errors } } = useForm<{ email: string }>();
  const [isSending, setIsSending] = useState(false);

  const findPassword = () => {
    sendPasswordResetEmail(auth, getValues('email'))
      .then(() => {
        alert('비밀번호 변경 이메일을 발송했습니다.');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/missing-email':
            return alert('이메일을 입력해주세요.');
          case 'auth/invalid-email':
            return alert('이메일 형식을 확인해주세요.');
          default:
            return alert('비밀번호 찾기에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <Modal
      title='비밀번호 찾기'
      description='이메일을 입력하면 비밀번호 재설정 링크가 발송됩니다.'
      isOpen={isOpen}
      isSending={isSending}
      onClose={onClose}
      onClick={findPassword}
    >
      <Input
        type='email'
        placeholder='이메일을 입력해주세요'
        name='email'
        register={register}
      />
      {errors?.email && (
        <Text color='red' fontSize='sm' className='mr-auto ml-5'>
          {errors.email.message}
        </Text>
      )}
    </Modal>
  );
};

export default FindPasswordModal;
