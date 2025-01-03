import React from "react";
import styled from "styled-components";
import { Button } from "./button";

interface ModalProps {
  isOpen: boolean;
  isSending: boolean;
  onClose: () => void;
  onClick: () => void;
  children: React.ReactNode;
}

const Modal = ({
  isOpen,
  isSending,
  onClose,
  onClick,
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        {children}
        <div style={{ marginTop: "20px" }}>
          <Button
            style={{ padding: "0.8rem 0.8rem" }}
            onClick={onClick}
            disabled={isSending}
          >
            {isSending ? "메일 전송 중..." : "메일 발송"}
          </Button>
          <Button
            style={{ padding: "0.8rem 0.8rem", marginLeft: "20px" }}
            bgColor="sub"
            onClick={onClose}
          >
            닫기
          </Button>
        </div>
      </ModalContent>
    </ModalBackdrop>
  );
};
export default Modal;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  row-gap: 24px;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: white;
  padding: 2rem;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  text-align: center;
`;
