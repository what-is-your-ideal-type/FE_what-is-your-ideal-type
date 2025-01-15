import React, { useState } from 'react';
import { Button } from './button/button';

type dropdownProps = {
  dropdownSpan: string;
  setDropdownSpan: (span: string) => void;
};

export const Dropdown = ({ dropdownSpan, setDropdownSpan }: dropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (span: string) => {
    setIsOpen(false); // 클릭 후 드롭다운 닫기
    setDropdownSpan(span);
  };

  return (
    <div className='relative inline-block'>
      <Button
        className='py-2 px-4 text-base bg-white border border-gray-300 rounded shadow-sm'
        onClick={toggleDropdown}
      >
        {dropdownSpan}
      </Button>

      {isOpen && (
        <ul className='absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg'>
          <li
            className='px-4 py-2 cursor-pointer hover:bg-gray-100'
            onClick={() => handleItemClick('최신 순')}
          >
            최신 순
          </li>
          <li
            className='px-4 py-2 cursor-pointer hover:bg-gray-100'
            onClick={() => handleItemClick('오래된 순')}
          >
            오래된 순
          </li>
        </ul>
      )}
    </div>
  );
};
