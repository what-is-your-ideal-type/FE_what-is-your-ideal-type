import React from 'react';
import ReactDOM from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
};

const Portal = ({ children }: PortalProps) => {
  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {children}
    </div>,
    portalRoot
  );
};

export default Portal;