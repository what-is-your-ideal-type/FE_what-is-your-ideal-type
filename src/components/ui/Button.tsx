import React from "react";
import styled from "styled-components";
import { ColorMap } from "../utils/color-map";

export interface ButtonProps {
  label?: string;
  width?: string;
  height?: string;
  bgColor?: "main" | "sub" | "white" | "disabled";
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.FormEvent) => void;
  disabled?: boolean;
}

const ButtonStyle = styled.button<ButtonProps>`
  background-color: ${({ bgColor }) =>
    bgColor ? ColorMap[bgColor].background : ColorMap["main"].background};
  color: white;
  font-size: 1rem;
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  padding: ${({ children }) =>
    typeof children === "string" ? "0.8rem 0" : "0"};
  border-radius: 0.375rem;
  border: none;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${({ bgColor }) =>
      bgColor ? ColorMap[bgColor].hover : ColorMap["main"].hover};
  }

  &:active {
    background-color: ${({ bgColor }) =>
      bgColor ? ColorMap[bgColor].background : ColorMap["main"].background};
  }
`;

export const Button = ({ children, label, style, ...props }: ButtonProps) => {
  const ariaLabel = typeof children === "string" ? children : label;
  return (
    <ButtonStyle aria-label={ariaLabel} role="button" style={style} {...props}>
      {children}
    </ButtonStyle>
  );
};
