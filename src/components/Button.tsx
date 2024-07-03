import React from "react";

export interface ButtonProps {
  label: string;
  backgroundColor: string;
  hoverColor: string;
  textColor: string;
  buttonSize: string;
  textSize: string;
}

function Button({
  label,
  backgroundColor,
  hoverColor,
  textColor,
  buttonSize,
  textSize,
}: ButtonProps) {
  const style = `bg-${backgroundColor} hover:bg-${hoverColor} text-${textSize} text-${textColor} ${buttonSize}  py-2 px-4 rounded-md`;
  return (
    <button type="button" className={style}>
      {label}
    </button>
  );
}

export default Button;
