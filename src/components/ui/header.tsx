import React from 'react';
import { Button } from './button/button';
import { Link, useNavigate } from 'react-router-dom';
import { Text } from './text';
import { useAuth } from '../../contexts/auth-context';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useMediaQuery } from 'usehooks-ts';
import { FlexBox } from './flexbox';

export const Header = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    const confirmation = window.confirm('로그아웃 하시겠습니까?');
    if (confirmation) {
      try {
        await signOut(auth);
        navigate('/');
      } catch (error) {
        console.error('Logout failed', error);
      }
    }
  };

  return (
    <header className='w-full flex justify-between items-center py-5 px-12'>
      {/* Text를 isMobile마다 조건부로 스타일을 주어야하는 로직이 계속 보이는데 아예 Text안에서 isMobile일 경우 조정을 해보는 것은 어떨까요? */}
      <Text fontSize={isMobile ? 'md' : 'lg'} fontWeight='bold'>
        AI 이상형 찾기
      </Text>
      <FlexBox className='items-center'>
        {currentUser ? (
          <>
            <Button bgColor='white' label='로그아웃' onClick={handleLogout}>
              <Text fontSize={isMobile ? 'xs' : 'sm'} color='black'>
                로그아웃
              </Text>
            </Button>
            <Text className='mx-3' fontSize={isMobile ? 'xs' : 'sm'}>
              |
            </Text>
            <Link to='/mypage'>
              <Button bgColor='white' label='마이페이지'>
                <Text fontSize={isMobile ? 'xs' : 'sm'} color='black'>
                  마이페이지
                </Text>
              </Button>
            </Link>
          </>
        ) : (
          <Button bgColor='white' label='로그인' onClick={() => navigate('/')}>
            <Text
              fontSize={isMobile ? 'xs' : 'sm'}
              fontWeight='bold'
              color='black'
            >
              로그인
            </Text>
          </Button>
        )}
      </FlexBox>
    </header>
  );
};
