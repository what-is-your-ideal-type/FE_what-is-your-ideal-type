import { FlexBox } from '../components/ui/flexbox';
import React, { useState } from 'react';
import { Text } from '../components/ui/text';
import { Main } from '../components/ui/main';
import { Button } from '../components/ui/button/button';
import { Header } from '../components/ui/header';
import { useNavigate } from 'react-router-dom';

const GenderSelect = () => {
  const navigate = useNavigate();
  const [checkedValue, setCheckedValue] = useState<'man' | 'woman' | null>(
    null,
  );

  return (
    <>
      <Header></Header>
      <Main>
        <FlexBox direction='column' gap='xl' className='text-center'>
          <FlexBox direction='column'>
            <FlexBox direction='column' gap='xs'>
              <Text fontSize='lg' fontWeight='bold'>
                이상형 선택하기
              </Text>
              <Text className='text-center whitespace-pre-line'>
                {'아래 정보를 입력하면 \n 당신의 이상형을 알려드려요!'}
              </Text>
            </FlexBox>
          </FlexBox>
          <FlexBox direction='column' gap='xs' className='items-start'>
            <Text fontWeight='bold'>이상형의 성별</Text>
            <FlexBox gap='sm'>
              <Button
                bgColor={checkedValue === 'man' ? 'main' : 'sub'}
                onClick={() => setCheckedValue('man')}
                className='w-40 h-14'
              >
                남성
              </Button>
              <Button
                bgColor={checkedValue === 'woman' ? 'main' : 'sub'}
                onClick={() => setCheckedValue('woman')}
                className='w-40 h-14'
              >
                여성
              </Button>
            </FlexBox>
          </FlexBox>
          <Button
            bgColor='main'
            onClick={() => navigate('/survey', { state: checkedValue })}
            className='w-full h-14'
          >
            테스트 시작하기
          </Button>
        </FlexBox>
      </Main>
    </>
  );
};

export default GenderSelect;
