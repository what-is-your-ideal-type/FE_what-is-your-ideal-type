import React from "react";
import styled from "styled-components";


export interface StyleProps {
  backgroundColor?: "#A860F6" | "#D1D5DB" | "#facc15" | "#10B981" | "white";
  hoverColor?: "#D4B7F4" | "#E5E7EB" | "#fde047" | "#34D399" | "#F4F5F7";
  textColor?: "white" | "#374151";
  width?: "12rem" | "16rem" | "4rem";
  height?: "3rem" | "4rem";
  textSize?: "1rem";
}

export interface ButtonProps extends StyleProps{
  label: string;
  type?: "submit" | "button";
}

const Button = styled.button<
  Pick<
    ButtonProps,
    | "backgroundColor"
    | "hoverColor"
    | "textColor"
    | "width"
    | "height"
    | "textSize"
  >
>`
  background-color: ${(props) => props.backgroundColor || "#007BFF"};
  color: ${(props) => props.textColor || "white"};
  font-size: ${(props) => props.textSize || "1rem"};
  width: ${(props) => props.width || "12rem"};
  height: ${(props) => props.height || "3rem"};
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

function StyledButton({ label, type = "button", ...props }: ButtonProps) {
  return (
    <Button type={type} {...props}>
      {label}
    </Button>
  );
}

export default StyledButton;
