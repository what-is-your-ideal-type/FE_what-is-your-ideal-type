import React, { useState, useEffect } from "react";
import { LinearProgress, Typography, Box } from "@mui/material";
import { Main } from "../styles/styled";
import { Text } from "../styles/Text";
import { FlexBox } from "../styles/FlexBox";

export const Loading = () => {
  const [progress, setProgress] = useState(0);

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
      <FlexBox direction="column" gap="45px">
        <img src="/images/spin.gif" alt="loading" className="w-20 h-20" />
        <Text fontSize="lg" fontWeight="bold">이상형을 찾고 있어요!</Text>
        <FlexBox direction="column" gap="10px" style={{width: "100%"}}>
          <Box sx={{ width: "100%", mt: 3 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 20,
                borderRadius: 8,
                backgroundColor: "#D4B7F4",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#A860F6",
                },
              }}
            />
          </Box>
          <Text fontWeight="bold">{progress}%</Text>
        </FlexBox>
      </FlexBox>
    </Main>
  );
};

export default Loading;
