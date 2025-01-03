import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import Input from "../ui/input";
import Modal from "../ui/modal";
import { Text } from "../ui/text";

interface FindPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FindPasswordModal = ({ isOpen, onClose }: FindPasswordModalProps) => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const findPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("비밀번호 변경 이메일을 발송했습니다.");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/missing-email":
            return setError("이메일을 입력해주세요.");
          case "auth/invalid-email":
            return setError("이메일 형식을 확인해주세요.");
          default:
            return alert("비밀번호 찾기에 실패했습니다. 다시 시도해주세요.");
        }
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      isSending={isSending}
      onClose={onClose}
      onClick={findPassword}
    >
      <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>비밀번호 찾기</h2>
      <p>이메일을 입력하면 비밀번호 재설정 링크가 발송됩니다.</p>
      <Input
        type="email"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && (
        <Text color="red" fontSize="sm" marginRight="auto" marginLeft="18%">
          {error}
        </Text>
      )}
    </Modal>
  );
};

export default FindPasswordModal;
