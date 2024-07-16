import React from "react";
import styled from "styled-components";


const Main = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F8F6EE;
`

export const Loading = () => {
  const loading = process.env.PUBLIC_URL + "/images/spin.gif";

  return (
    <Main>
      <div className="flex flex-col items-center">
        <img src="/images/spin.gif" alt="loading" className="w-20 h-20" />
        <p className="text-base font-bold mt-3">이상형을 찾고 있어요!</p>
        <p className="text-sm mt-3">잠시만 기다려주세요.</p>
      </div>
    </Main>
  );
};

export default Loading;
