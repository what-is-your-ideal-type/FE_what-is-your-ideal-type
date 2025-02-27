import Input from '../components/ui/input';
import React, { useCallback, useState } from 'react';
import { AuthError } from 'firebase/auth';
import { Button } from '../components/ui/button/button';
import { Main } from '../components/ui/main';
import { FlexBox } from '../components/ui/flexbox';
import { Text } from '../components/ui/text';
import { Header } from '../components/ui/header';
import {
  saveUserInfo,
  signUpWithEmail,
} from '../services/auth/signup-with-email';
import EmailVerificationModal from '../components/functional/email-verification-modal';
import { ErrorMessage } from '../components/ui/error-message';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../components/utils/validation';
import { z } from 'zod';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const user = await signUpWithEmail(data.email, data.password);
      await saveUserInfo(user.uid, data.email, data.nickname);

      alert('회원가입이 완료됐습니다. 이메일 인증 후 이용해주세요.');
      setModalOpen(true);
    } catch (err) {
      const error = err as AuthError;
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert('이미 사용 중인 이메일입니다.');
          break;
        case 'auth/network-request-failed':
          alert('네트워크 연결에 실패 하였습니다.');
          break;
        case 'auth/internal-error':
          alert('잘못된 요청입니다.');
          break;
        default:
          alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <>
      <Header></Header>
      <Main>
        <FlexBox direction='column' gap='md'>
          <FlexBox direction='column' gap='xs' className='items-start w-full'>
            <Text fontSize='lg'>회원가입</Text>
            <Text fontSize='md'>이상형을 찾기 위한 여정 시작</Text>
          </FlexBox>
          <FlexBox direction='column' gap='xs'>
            <Input
              type='nickname'
              placeholder='닉네임을 입력해주세요'
              name='nickname'
              register={register}
            />
            {errors.nickname && (
              <ErrorMessage message={errors.nickname?.message} />
            )}
            <Input
              type='email'
              placeholder='이메일을 입력해주세요'
              name='email'
              register={register}
            />
            {errors.email && <ErrorMessage message={errors.email?.message} />}
            <Input
              type='password'
              placeholder='비밀번호를 입력해주세요'
              name='password'
              register={register}
            />
            {errors.password && (
              <ErrorMessage message={errors.password?.message} />
            )}
            <Input
              type='password'
              placeholder='비밀번호를 한 번 더 입력해주세요'
              name='confirmPassword'
              register={register}
            />
            {errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword?.message} />
            )}
          </FlexBox>
          <div className='w-full pt-8'>
            <Button
              className='w-full'
              label='회원가입하기'
              bgColor='main'
              onClick={handleSubmit(onSubmit)}
            >
              회원가입하기
            </Button>
          </div>
        </FlexBox>
      </Main>
      <EmailVerificationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default SignUp;
