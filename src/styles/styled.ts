import styled, { css } from "styled-components";

export const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: white;
  padding: 16px;
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
  gap: 32px;
`;

export const ErrorMessage = styled.p`
  color: #ff0000;
`;
