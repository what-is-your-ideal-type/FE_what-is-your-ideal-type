import React from "react";
import styled from "styled-components";


const ColorMap: { [key: string]: { background: string; hover: string } } = {
  main: {
    background: "#706EF4",
    hover: "#5b5dd7",
  },
  sub: {
    background: "#D1D5DB",
    hover: "#b1b5c1",
  },
  kakao: {
    background: "#facc15",
    hover: "#e5b007",
  },
  naver: {
    background: "#10B981",
    hover: "#0e976a",
  },
  white: {
    background: "white",
    hover: "#f0f0f0",
  },
};

export interface ButtonProps{
    label?: string;
    width?: string;
    height?: string;
    bgColor?: "main" | "sub" | "kakao" | "naver" | "white";
    children?: React.ReactNode;
    onClick?: () => void
  }

const ButtonStyle = styled.button<ButtonProps>`
  background-color: ${(props) => props.bgColor ? ColorMap[props.bgColor].background : "white"};
  color: white;
  font-size: 1rem;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '3rem'};
  padding: 0.5rem 0;
  border-radius: 0.375rem;
  border: none;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.bgColor ? ColorMap[props.bgColor].hover : "white"};
  }
    
  &:active {
    background-color: ${(props) => props.bgColor ? ColorMap[props.bgColor].background : "white"};
  }
`;

export const Button = ({children, label, ...props }: ButtonProps) => {
  return (
    <ButtonStyle 
      aria-label={label}
      role={"button"}
      {...props}
    >
      {children}
    </ButtonStyle>
  );
}
