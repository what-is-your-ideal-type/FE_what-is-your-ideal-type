import React, { useState, useEffect } from 'react';
import {
  SurveyTypes,
  surveyContentsMen,
  surveyContentsWomen,
} from '../components/utils/survey';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button/button';
import { Header } from '../components/ui/header';
import { ProgressBar } from '../components/ui/progressbar';
import { FlexBox } from '../components/ui/flexbox';
import { Text } from '../components/ui/text';
import { Main } from '../components/ui/main';

const Survey = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSurvey, setCurrentSurvey] = useState<SurveyTypes[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [prompts, setprompts] = useState<string[]>([]);
  const [hashtags, setHashTags] = useState<string[]>([]);
  const gender = location.state;

  const handleOptionChange = (valueEng: string, valueKor: string) => {
    setprompts((prev) => prev.concat(valueEng));
    setHashTags((prev) => prev.concat(valueKor));
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = () => {
    const check = confirm('이상형을 생성하겠습니까?');
    const promptObj = {
      gender: gender,
      age: prompts[0],
      bodyShape: prompts[1],
      faceShape: prompts[2],
      skinTone: prompts[3],
      eyesShape: prompts[4],
      hairStyle: prompts[5],
      hairColor: prompts[6],
      outfit: prompts[7],
    };
    if (check) {
      navigate('/generate', {
        state: { prompts: promptObj, hashTags: hashtags },
      });
    } else {
      setprompts((prev) => prev.slice(0, prev.length - 1));
      setHashTags((prev) => prev.slice(0, prev.length - 1));
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  useEffect(() => {
    if (!gender) {
      alert('성별을 먼저 선택해주세요');
      navigate('/genderselect');
    }
    if (gender === 'man') {
      setCurrentSurvey(surveyContentsMen);
    } else {
      setCurrentSurvey(surveyContentsWomen);
    }
  }, [location]);

  useEffect(() => {
    if (
      currentSurvey.length > 0 &&
      currentQuestionIndex >= 0 &&
      currentQuestionIndex === currentSurvey.length
    ) {
      handleSubmit();
    }
  }, [currentQuestionIndex, currentSurvey.length]);

  return (
    <>
      <div className='absolute top-0 w-full'>
        <Header />
        <ProgressBar
          value={
            currentSurvey.length > 0
              ? (currentQuestionIndex / currentSurvey.length) * 100
              : 0
          }
        ></ProgressBar>
      </div>
      <Main>
        {currentSurvey[currentQuestionIndex] ? (
          // Assign a unique key based on the current question index
          <div key={currentQuestionIndex} className='animate-slideInRight'>
            <FlexBox direction='column' gap='lg'>
              <Text fontSize='lg' fontWeight='bold' className='text-center'>
                {currentSurvey[currentQuestionIndex].question}
              </Text>
              <FlexBox direction='column' gap='xs'>
                {currentSurvey[currentQuestionIndex].options.map((option) => (
                  <div
                    key={option.label}
                    className='flex justify-center items-center'
                  >
                    <Button
                      bgColor='main'
                      className='w-80 h-14'
                      onClick={() => {
                        handleOptionChange(option.value, option.label);
                      }}
                    >
                      {option.label}
                    </Button>
                  </div>
                ))}
              </FlexBox>
            </FlexBox>
          </div>
        ) : null}
      </Main>
    </>
  );
};

export default Survey;
