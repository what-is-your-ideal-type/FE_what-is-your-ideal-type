import Input from '../components/ui/input';
import React, { useCallback, useState } from 'react';
import { AuthError } from 'firebase/auth';
import { Button } from '../components/ui/button/button';
import { Main } from '../components/ui/main';
import { FlexBox } from '../components/ui/flexbox';
import { Text } from '../components/ui/text';
import { Header } from '../components/ui/header';
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from '../components/utils/validation';
import {
  saveUserInfo,
  signUpWithEmail,
} from '../services/auth/signup-with-email';
import EmailVerificationModal from '../components/functional/email-verification-modal';
import { ErrorMessage } from '../components/ui/error-message';

const SignUp = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // 유효성 검사 결과 상태
  const [error, setError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  // 이메일 변경 시 유효성 검사 적용
  const handleEmailChange = useCallback(
    (value: string) => {
      setError('');
      setEmail(value);
      setEmailError(validateEmail(value));
    },
    [email],
  );

  // 비밀번호 변경 시 유효성 검사 적용
  const handlePasswordChange = useCallback(
    (value: string) => {
      setError('');
      setPassword(value);
      setPasswordError(validatePassword(value));
    },
    [password],
  );

  // 비밀번호 재확인 변경 시 유효성 검사 적용
  const handleConfirmPasswordChange = useCallback(
    (value: string) => {
      setError('');
      setConfirmPassword(value);
      setConfirmPasswordError(validateConfirmPassword(password, value));
    },
    [confirmPassword],
  );

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // 회원가입 처리
      const user = await signUpWithEmail(email, password);
      await saveUserInfo(user.uid, email);

      alert('회원가입이 완료됐습니다. 이메일 인증 후 이용해주세요.');
      setModalOpen(true);
    } catch (err) {
      const error = err as AuthError;
      // firebase 오류 처리
      switch (error.code) {
        case 'auth/email-already-in-use':
          return setEmailError('이미 사용 중인 이메일입니다.');
        case 'auth/network-request-failed':
          return setError('네트워크 연결에 실패 하였습니다.');
        case 'auth/internal-error':
          return setError('잘못된 요청입니다.');
        default:
          return alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <>
      <Header></Header>
      <Main>
        <FlexBox direction='column' gap='md'>
          <FlexBox direction='column' gap='xs' className='items-start w-full'>
            <Text fontSize='lg' fontWeight='bold'>
              회원가입
            </Text>
            <Text fontSize='md'>이상형을 찾기 위한 여정 시작</Text>
          </FlexBox>
          <FlexBox direction='column' gap='xs'>
            <Input
              type='email'
              placeholder='이메일을 입력해주세요'
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
            {emailError && <ErrorMessage message={emailError} />}
            <Input
              type='password'
              placeholder='비밀번호를 입력해주세요'
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            {passwordError && <ErrorMessage message={passwordError} />}
            <Input
              type='password'
              placeholder='비밀번호를 한 번 더 입력해주세요'
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            />
            {confirmPasswordError && (
              <ErrorMessage message={confirmPasswordError} />
            )}
            {error ? (
              <Text color='red' fontSize='sm' className='mr-auto ml-2'>
                {error}
              </Text>
            ) : null}
          </FlexBox>
          <div className='w-full pt-8'>
            {!email ||
            !password ||
            !confirmPassword ||
            emailError ||
            passwordError ||
            confirmPasswordError ? (
              <Button
                className='w-full'
                label='회원가입하기'
                bgColor='disabled'
                disabled={true}
              >
                회원가입하기
              </Button>
            ) : (
              <Button
                className='w-full'
                label='회원가입하기'
                bgColor='main'
                onClick={(e) => handleSignUp(e)}
              >
                회원가입하기
              </Button>
            )}
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
