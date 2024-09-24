import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";
import { Button } from "../ui/Button";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailVerificationModal = ({
  isOpen,
  onClose,
}: EmailVerificationModalProps) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const sendVerificationEmail = () => {
    if (!currentUser) return;
    setIsSending(true);

    sendEmailVerification(currentUser)
      .then(() => {
        alert("이메일 인증 메일이 발송되었습니다.");
      })
      .catch((error) => {
        console.error("이메일 전송 오류:", error);
        alert("인증 메일 전송에 실패했습니다. 다시 시도해주세요.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentUser) {
        currentUser.reload().then(() => {
          if (currentUser.emailVerified) {
            setIsVerified(true);
            clearInterval(intervalId);
            onClose(); // 이메일 인증이 완료되면 모달 닫기
            alert("이메일 인증이 완료되었습니다. 로그인하세요.");
            navigate("/");
          }
        });
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [onClose]);

  // 모달이 열려 있는 상태일 때만 렌더링
  if (!isOpen) {
    return null;
  }

  return (
    <ModalBackdrop>
      <ModalContent>
        <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
          이메일 인증 요청
        </h2>
        <p>회원가입을 완료하려면 이메일 인증을 완료해주세요.</p>
        <div style={{ marginTop: "24px" }}>
          <Button onClick={sendVerificationEmail} disabled={isSending}>
            {isSending ? "메일 전송 중..." : "인증 메일 전송"}
          </Button>
          <Button
            style={{ marginLeft: "20px" }}
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

export default EmailVerificationModal;

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
