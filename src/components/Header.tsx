import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "./Button";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Text } from "../styles/Text";
import Portal from "./Portal";

const StyledHeader = styled.header`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  align-items: center;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding: 0 10px;
  }
`;

interface HeaderComponentType {
    navigate: NavigateFunction;
}
  

const MobileComponent = ({ navigate }: HeaderComponentType) => (
  <Button width="auto" onClick={() => navigate('/')}>
    <img src="/images/chervon_left.png" alt="chervon_left.png"/>
  </Button>
);

const DeskTopComponent = ({ navigate }: HeaderComponentType) => (
  <>
    <Button label="홈" width="auto" onClick={() => navigate('/')}>
      <Text fontSize="lg" fontWeight="bold" color="black">홈</Text>
    </Button>
    <Button label="로그인" width="auto" onClick={() => navigate('signin')}>
      <Text fontSize="lg" fontWeight="bold" color="black">로그인</Text>
    </Button>
  </>
);

export const Header = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();

  return (
    <Portal>
        <StyledHeader>
        {isMobile ? <MobileComponent navigate={navigate} /> : <DeskTopComponent navigate={navigate} />}
        </StyledHeader>
    </Portal>
  );
};
