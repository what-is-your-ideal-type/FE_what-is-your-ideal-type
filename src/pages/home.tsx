import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button/button';
import { Main } from '../components/ui/main';
import Input from '../components/ui/input';
import { useAuth } from '../contexts/auth-context';
import { ButtonGroup } from '../components/ui/button/button-group';
import { FlexBox } from '../components/ui/flexbox';
import { Text } from '../components/ui/text';
import { FirebaseError } from 'firebase/app';
import { useResponsive } from '../hooks/use-responsive';
import FindPasswordModal from '../components/functional/find-password-modal';
import NavigateToSurvey from '../components/functional/navigate-to-survey-props';
import { loginWithGoogle } from '../services/auth/login-with-google';
import { loginWithEmail } from '../services/auth/login-with-email';
import { useGuestMode } from '../hooks/use-guest-mode';

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useResponsive();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [_, setGuestMode] = useGuestMode();

  const { setCurrentUser } = useAuth();

  const handleLoginWithEmail = async () => {
    try {
      const userCredential = await loginWithEmail(email, password);
      if (userCredential) {
        setCurrentUser(userCredential.user);
        alert('로그인에 성공했습니다.');
        setGuestMode('false');
        navigate('/mypage');
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case 'auth/invalid-credential':
          return setError('이메일 또는 비밀번호를 확인해주세요');
        default:
          return setError('입력 정보를 확인해주세요');
      }
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const credential = await loginWithGoogle();
      if (credential) {
        setCurrentUser(credential.user);
        alert('로그인에 성공했습니다.');
        setGuestMode('false');
        navigate('/mypage');
      }
    } catch (error) {
      console.error('Error handleLoginWithGoogle: ', error);
    }
  };

  return (
    <Main isMobile={isMobile}>
      <FlexBox direction='column' gap='md'>
        <FlexBox direction='column' gap='xs' className='items-start w-full'>
          <Text fontSize='lg' fontWeight='bold'>
            안녕하세요!
          </Text>
          <Text fontSize='md' fontWeight='bold'>
            나만의 이상형을 찾아 볼까요?
          </Text>
        </FlexBox>
        <FlexBox direction='column' gap='sm'>
          <Input
            type='email'
            placeholder='이메일을 입력해주세요'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type='password'
            placeholder='비밀번호를 입력해주세요'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FlexBox>
        {error ? (
          <Text fontSize='md' color='red'>
            {error}
          </Text>
        ) : null}
        <Button
          bgColor='transparent'
          className='p-0'
          onClick={() => {
            setModalOpen(true);
          }}
        >
          비밀번호 찾기
        </Button>
        <Button
          bgColor='main'
          label='로그인하기'
          className='w-full'
          onClick={handleLoginWithEmail}
        >
          로그인하기
        </Button>
        <NavigateToSurvey label='로그인 없이 시작' isGuestMode={true} />
      </FlexBox>
      <FlexBox direction='column' gap='xl'>
        <div>
          <Text fontSize='md' className='mb-3 text-center'>
            SNS 계정으로 간편하게 시작하기
          </Text>
          {/* Button Group을 여기서만 사용하는데 따로 style props도 넘겨주지 않아서 일반 element로 사용해도 좋을 것 같습니다 */}
          <ButtonGroup>
            <Button
              label='구글 로그인'
              bgColor='white'
              onClick={handleLoginWithGoogle}
            >
              <img src='/images/google.png' alt='구글 로그인' />
            </Button>
            <Button label='카카오 로그인' bgColor='white'>
              <img src='/images/kakao.png' alt='카카오 로그인' />
            </Button>
            <Button label='네이버 로그인' bgColor='white'>
              <img src='/images/naver.png' alt='네이버 로그인' />
            </Button>
          </ButtonGroup>
        </div>
        <FlexBox gap='sm'>
          <Text fontSize='md'>이상형 찾기가 처음이라면?</Text>
          <Button
            label='회원가입'
            bgColor='underline'
            className='font-bold p-0'
            onClick={() => navigate('signup')}
          >
            가입하기
          </Button>
        </FlexBox>
      </FlexBox>
      <FindPasswordModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Main>
  );
};

export default Home;
