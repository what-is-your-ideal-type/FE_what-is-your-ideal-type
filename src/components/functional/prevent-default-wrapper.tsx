import React from 'react';
import { FlexBox } from '../ui/flexbox';

interface PreventDefaultWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PreventDefaultWrapper = ({
  children,
  className,
}: PreventDefaultWrapperProps) => {
  const handlePreventDefault = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <FlexBox
      onContextMenu={handlePreventDefault}
      onDragStart={handlePreventDefault}
      onTouchStart={handlePreventDefault}
      gap='sm'
      className={className}
    >
      {children}
    </FlexBox>
  );
};
