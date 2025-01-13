import React from 'react';
import styled from 'styled-components';

export interface InputProps {
  type: 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = styled.input`
  width: 22rem;
  height: 3rem;
  font-size: 1rem;
  border: 1px solid #d1d3d8;
  padding: 0.5rem 2.5rem;
  border-radius: 0.375rem;
  background-color: white;
`;

const Icon = styled.img`
  position: absolute;
  top: 50%;
  left: 0.5rem;
  height: 28px;
  transform: translateY(-50%);
  width: auto;
`;

function StyledInput({type, placeholder, value, onChange}: InputProps) {
  return (
    <div style={{position: 'relative'}}>
      {type === 'email' ? (
        <Icon src='images/Message_light.png' alt='Email' />
      ) : (
        <Icon src='/images/Lock_light.png' alt='password' />
      )}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default StyledInput;
