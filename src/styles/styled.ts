import styled from "styled-components";

export const Main = styled.main<{ gap?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: white;
  padding: 16px;
  gap: ${(props) => props.gap || "0px"};
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InnerSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 192px;
  height: 192px;
  background-color: white;
  border-radius: 50%;
`;

export const AuthSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  gap: 16px;
  background-color: #e9e7e2;
  border-radius: 12px;
`;

export const ButtonGroup = styled.section`
  display: flex;
  justify-content: center;
  gap: 14px;
`;

export const ErrorMessage = styled.p`
  color: #ff0000;
`;
