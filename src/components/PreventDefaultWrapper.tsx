import React from "react";

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
    <div
      onContextMenu={handlePreventDefault}
      onDragStart={handlePreventDefault}
      onTouchStart={handlePreventDefault}
    >
      {children}
    </div>
  );
};
