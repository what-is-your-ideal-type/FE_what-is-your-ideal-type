import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps {
  label?: string;
  bgColor?: 'main' | 'sub' | 'white' | 'disabled' | 'underline' | 'transparent';
  children?: React.ReactNode;
  onClick?: (e: React.FormEvent) => void;
  disabled?: boolean;
  className?: string;
}
export const Button = ({
  children,
  label,
  // 버튼의 기본 스타일을 고려했을 때 transparent가 기본적인 bgColor로 입력되기 때문에, main은 따로 입력값으로 넣어주게 의도하는게 좋을 것 같습니다.
  bgColor = 'transparent',
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const ariaLabel = typeof children === 'string' ? children : label;

  // 여러가지 분기처리가 되어 선언적으로 스타일을 적용할 수 있게 잘 짜주셨는데, 만약 유지보수를 위해 코드를 고쳐야하는 상황이라면 해당 코드가 가독성이 안좋을 수 있다는 생각을 했습니다.
  // 따라서 코드를 쪼개어 개발자가 세세하게 스타일을 들여다보지 않고 선언적인 키워드로 스타일을 적용할 수 있도록 구분해보았습니다.

  // 기본 스타일
  const baseStyles =
    'leading-none transition duration-200 ease-in-out cursor-pointer rounded-lg text-white';

  // 배경 스타일
  const bgColorStyles = {
    transparent: 'ml-auto opacity-70',
    underline:
      'text-main border-solid border-b border-main bg-transparent hover:text-main-hover',
    main: !disabled ? 'bg-main hover:bg-main-hover' : '',
    sub: !disabled ? 'bg-sub hover:bg-sub-hover' : '',
    white: !disabled ? 'bg-white hover:bg-white-hover text-black' : '',
    disabled: 'bg-disabled cursor-not-allowed',
  };

  // 추가 조건부 스타일
  const conditionalStyles = {
    'p-2.5': typeof children === 'string',
  };

  const classes = twMerge(
    clsx(baseStyles, bgColorStyles[bgColor], conditionalStyles),
    className, // 외부에서 전달된 추가 클래스
  );

  return (
    <button
      aria-label={ariaLabel}
      role='button'
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
