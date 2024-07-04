import React, { FormEvent } from "react";

export interface ButtonProps {
  label: string;
  type?: "submit" | "button";
  backgroundColor: string;
  hoverColor: string;
  textColor: string;
  buttonSize: string;
  textSize: string;
}

function Button({
  label,
  type,
  backgroundColor,
  hoverColor,
  textColor,
  buttonSize,
  textSize,
}: ButtonProps) {
  const style = `bg-${backgroundColor} hover:bg-${hoverColor} text-${textSize} text-${textColor} ${buttonSize}  py-2 px-4 rounded-md`;
  return (
    <button type={type} className={style}>
      {label}
    </button>
  );
}

export default Button;
