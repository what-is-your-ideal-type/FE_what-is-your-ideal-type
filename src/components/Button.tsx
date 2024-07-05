import React from "react";
import styled from "styled-components";

export interface ButtonProps {
  label: string;
  type?: "submit" | "button";
  backgroundColor: string;
  hoverColor: string;
  textColor: string;
  width: string;
  height: string;
  textSize: string;
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
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  font-size: ${(props) => props.textSize};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

function StyledButton({
  label,
  type = "button",
  backgroundColor,
  hoverColor,
  textColor,
  width,
  height,
  textSize,
}: ButtonProps) {
  return (
    <Button
      type={type}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      textColor={textColor}
      width={width}
      height={height}
      textSize={textSize}
    >
      {label}
    </Button>
  );
}

export default StyledButton;
