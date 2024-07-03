import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Survey } from '../pages';

test('폼 제출 테스트', () => {
  act(() => {
    render(<Survey />);
  })
  console.log = jest.fn();
  window.alert = jest.fn();

  const femaleOption = screen.getByLabelText(/여자/i);

  fireEvent.click(femaleOption);
  fireEvent.click(screen.getByLabelText(/10대/i));
  fireEvent.click(screen.getByLabelText(/150cm 이하/i));
  fireEvent.click(screen.getByLabelText(/50kg 이하/i));
  fireEvent.click(screen.getByLabelText(/숏컷/i));
  fireEvent.click(screen.getByLabelText(/생머리/i));
  fireEvent.click(screen.getByLabelText(/무쌍/i));
  fireEvent.click(screen.getByLabelText(/도자기처럼 하얀 피부색/i));

  expect(console.log).toHaveBeenCalledWith('응답내용 : ', [
    "10대",
    "150cm 이하",
    "50kg 이하",
    "숏컷",
    "생머리",
    "무쌍",
    "도자기처럼 하얀 피부색",
  ]);
});
