import React from "react";
import styled from "styled-components";
import { ColorMap } from "./ColorMap";

export interface ButtonProps{
    label?: string;
    width?: string;
    height?: string;
    bgColor?: "main" | "sub" | "kakao" | "naver" | "white";
    children?: React.ReactNode;
    onClick?: () => void
  }

const ButtonStyle = styled.button<ButtonProps>`
  background-color: ${(props) => props.bgColor ? ColorMap[props.bgColor].background : ColorMap['main'].background};
  color: white;
  font-size: 1rem;
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  padding: 0.5rem 0;
  border-radius: 0.375rem;
  border: none;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.bgColor ? ColorMap[props.bgColor].hover : ColorMap['main'].hover};
  }
    
  &:active {
    background-color: ${(props) => props.bgColor ? ColorMap[props.bgColor].background : ColorMap['main'].background};
  }
`;

export const Button = ({children, label, ...props }: ButtonProps) => {
  const ariaLabel = typeof children === 'string' ? children : label;
  return (
    <ButtonStyle 
      aria-label={ariaLabel}
      role={"button"}
      {...props}
    >
      {children}
    </ButtonStyle>
  );
}
