import React from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { Text } from "./Text";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useMediaQuery } from "usehooks-ts";

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 50px;
  align-items: center;
  top: 0;
`;

export const Header = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    const confirmation = window.confirm("로그아웃 하시겠습니까?");
    if (confirmation) {
      try {
        await signOut(auth);
        navigate("/");
      } catch (error) {
        console.error("Logout failed", error);
      }
    }
  };

  return (
    <StyledHeader>
      {currentUser ? (
        <Button
          bgColor="white"
          label="로그아웃"
          width="auto"
          onClick={handleLogout}
        >
          <Text fontSize={isMobile ? 'md' : 'lg'} fontWeight="bold" color="black">
            로그아웃
          </Text>
        </Button>
      ) : (
        <Button
          bgColor="white"
          label="로그인"
          width="auto"
          onClick={() => navigate("/")}
        >
          <Text fontSize={isMobile ? 'md' : 'lg'} fontWeight="bold" color="black">
            로그인
          </Text>
        </Button>
      )}
    </StyledHeader>
  );
};
