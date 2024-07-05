import React from "react";
import styled from "styled-components";

export interface InputProps {
  type: string;
  placeholder: string;
  value: string | "email" | "password" | "confirmPassword";
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = styled.input`
  width: 16rem;
  height: 3rem;
  font-size: 1rem;
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
`;

function StyledInput({ type, placeholder, value, onChange }: InputProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  );
}

export default StyledInput;
