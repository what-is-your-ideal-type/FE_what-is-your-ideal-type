import React from "react";

export interface InputProps {
  type: string;
  placeholder: string;
}

function Input({ type, placeholder }: InputProps) {
  const style = `w-64 h-12 text-md bg-white px-4 py-2 rounded-md`;
  return <input type={type} placeholder={placeholder} className={style} />;
}

export default Input;
