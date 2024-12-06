import React from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { Text } from "./Text";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useMediaQuery } from "usehooks-ts";
import { FlexBox } from "./FlexBox";

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
      <Text fontSize={isMobile ? "md" : "lg"} fontWeight="bold">
        AI 이상형 찾기
      </Text>
      <FlexBox>
        {currentUser ? (
          <>
            <Button bgColor="white" label="로그아웃" onClick={handleLogout}>
              <Text fontSize={isMobile ? "xs" : "sm"} color="black">
                로그아웃
              </Text>
            </Button>
            <Text
              marginLeft="0.8rem"
              marginRight="0.8rem"
              fontSize={isMobile ? "xs" : "sm"}
            >
              |
            </Text>
            <Link to={"/mypage"}>
              <Button bgColor="white" label="마이페이지">
                <Text fontSize={isMobile ? "xs" : "sm"} color="black">
                  마이페이지
                </Text>
              </Button>
            </Link>
          </>
        ) : (
          <Button
            bgColor="white"
            label="로그인"
            width="auto"
            onClick={() => navigate("/")}
          >
            <Text
              fontSize={isMobile ? "md" : "lg"}
              fontWeight="bold"
              color="black"
            >
              로그인
            </Text>
          </Button>
        )}
      </FlexBox>
    </StyledHeader>
  );
};
