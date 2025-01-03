import React from "react";
import { FlexBox } from "../ui/flexbox";

interface PreventDefaultWrapperProps {
  children: React.ReactNode;
}

export const PreventDefaultWrapper = ({
  children,
}: PreventDefaultWrapperProps) => {
  const handlePreventDefault = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <FlexBox
      onContextMenu={handlePreventDefault}
      onDragStart={handlePreventDefault}
      onTouchStart={handlePreventDefault}
      gap="20px"
    >
      {children}
    </FlexBox>
  );
};
