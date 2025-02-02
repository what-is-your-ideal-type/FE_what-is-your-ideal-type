import { register } from 'node:module';
import React from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form';

export interface InputProps<T extends FieldValues> {
  type: 'email' | 'password';
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
}

function StyledInput<T extends FieldValues>({
  type,
  placeholder,
  name,
  register
}: InputProps<T>) {
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
        required
        {...register(name)}
        className='w-full h-12 text-base border border-gray rounded-lg pl-12 pr-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
    </div>
  );
}

export default StyledInput;
