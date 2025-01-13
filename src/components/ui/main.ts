import styled from 'styled-components';

interface MainProps {
  gap?: string;
  isMobile?: boolean;
}

export const Main = styled.main<MainProps>`
  display: flex;
  flex-direction: ${({isMobile}) => (isMobile ? 'column' : 'row')};
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: white;
  padding: 16px;
  gap: ${({gap, isMobile}) => (isMobile ? '1.5rem' : gap || '0px')};
`;
