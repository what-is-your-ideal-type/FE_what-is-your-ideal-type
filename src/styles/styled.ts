import styled from "styled-components";
import { ColorMap } from "../components/ColorMap";

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

export const Card = styled.div`
  width: 225px;
  background-color: #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
`;

export const ProgressBar = styled.div<{ value: number }>`
  appearance: none;
  width: 100%;
  height: 0.5rem;
  border-radius: 9999px;
  margin-bottom: 5rem;
  background-color: ${ColorMap["sub"].background}; /* 기본 색상 */

  /* 진행 상태에 따라 색상 변경 */
  &::before {
    content: "";
    display: block;
    height: 100%;
    width: ${(props) => props.value}%; /* 진행률을 백분율로 설정 */
    background-color: ${ColorMap["main"].background}; /* 진행 중 색상 */
    border-radius: 9999px; /* 둥근 모서리 */
    transition: background-color 0.3s ease;
  }
`;
