import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "../ui/Modal";

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
        alert("이메일 인증 메일이 발송되었습니다. 이메일을 확인해주세요.");
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

  return (
    <Modal
      isOpen={isOpen}
      isSending={isSending}
      onClose={onClose}
      onClick={sendVerificationEmail}
    >
      <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>이메일 인증 요청</h2>
      <p>회원가입을 완료하려면 이메일 인증을 완료해주세요.</p>
    </Modal>
  );
};

export default EmailVerificationModal;
