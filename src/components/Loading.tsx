import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LinearProgress, Typography, Box } from "@mui/material";

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f6ee;
`;

export const Loading = () => {
  const [progress, setProgress] = useState(0);
  const loading = process.env.PUBLIC_URL + "/images/spin.gif";

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10,
      );
    }, 1500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Main>
      <div className="flex flex-col items-center">
        <img src="/images/spin.gif" alt="loading" className="w-20 h-20" />
        <p className="text-base font-bold mt-3">이상형을 찾고 있어요!</p>
        <Box sx={{ width: "100%", mt: 3 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 8,
              backgroundColor: "#D4B7F4",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#A860F6",
              },
            }}
          />
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${progress}%`}</Typography>
      </div>
    </Main>
  );
};

export default Loading;
