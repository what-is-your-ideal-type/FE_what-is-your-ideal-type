import React from 'react';

export interface InputProps {
  type: 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function StyledInput({ type, placeholder, value, onChange }: InputProps) {
  const iconSrc =
    type === 'email' ? 'images/Message_light.png' : 'images/Lock_light.png';
  const iconAlt = type === 'email' ? 'Email' : 'Password';

  return (
    <div className='relative w-[22rem]'>
      {/* 아이콘 */}
      <img
        src={iconSrc}
        alt={iconAlt}
        className='absolute top-1/2 left-3 h-7 w-auto transform -translate-y-1/2'
      />
      {/* 입력 필드 */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className='w-full h-12 text-base border border-gray rounded-lg pl-12 pr-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
    </div>
  );
}

export default StyledInput;
