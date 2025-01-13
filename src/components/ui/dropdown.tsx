import React, {useState} from 'react';
import styled from 'styled-components';
import {Button} from './button';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled(Button)`
  padding: 10px;
  font-size: 16px;
`;

const DropdownList = styled.ul`
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

type dropdownProps = {
  dropdownSpan: string;
  setDropdownSpan: (span: string) => void;
};

export const Dropdown = ({dropdownSpan, setDropdownSpan}: dropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (span: string) => {
    setIsOpen(false); // 클릭 후 드롭다운 닫기
    setDropdownSpan(span);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>{dropdownSpan}</DropdownButton>
      {isOpen && (
        <DropdownList>
          <DropdownItem onClick={() => handleItemClick('최신 순')}>
            최신 순
          </DropdownItem>
          <DropdownItem onClick={() => handleItemClick('오래된 순')}>
            오래된 순
          </DropdownItem>
        </DropdownList>
      )}
    </DropdownContainer>
  );
};
