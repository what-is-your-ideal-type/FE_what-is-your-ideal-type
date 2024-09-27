import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "./Button";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Text } from "./Text";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  align-items: center;
  top: 0;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding: 0 10px;
  }
`;

interface HeaderComponentType {
  navigate: NavigateFunction;
}

const MobileComponent = ({ navigate }: HeaderComponentType) => (
  <Button bgColor="white" width="auto" onClick={() => navigate("/")}>
    <img src="/images/chervon_left.png" alt="chervon_left.png" />
  </Button>
);

const DeskTopComponent = ({ navigate }: HeaderComponentType) => {
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
    <>
      <Button
        bgColor="white"
        label="홈"
        width="auto"
        onClick={() => navigate("/")}
      >
        <Text fontSize="lg" fontWeight="bold" color="black">
          홈
        </Text>
      </Button>
      {currentUser ? (
        <Button
          bgColor="white"
          label="로그아웃"
          width="auto"
          onClick={handleLogout}
        >
          <Text fontSize="lg" fontWeight="bold" color="black">
            로그아웃
          </Text>
        </Button>
      ) : (
        <Button
          bgColor="white"
          label="로그인"
          width="auto"
          onClick={() => navigate("signin")}
        >
          <Text fontSize="lg" fontWeight="bold" color="black">
            로그인
          </Text>
        </Button>
      )}
    </>
  );
};

export const Header = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  return (
    <StyledHeader>
      {isMobile ? (
        <MobileComponent navigate={navigate} />
      ) : (
        <DeskTopComponent navigate={navigate} />
      )}
    </StyledHeader>
  );
};
