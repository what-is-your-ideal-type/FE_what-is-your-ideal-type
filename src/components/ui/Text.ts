import styled from "styled-components";

const fontSizes: { [key: string]: string } = {
  xs: "12px",
  sm: "16px",
  md: "18px",
  lg: "24px",
  xl: "30px",
  xxl: "36px",
};

export const Text = styled.p<{
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  fontWeight?: string;
  color?: string;
  marginRight?: string;
  marginLeft?: string;
  marginTop?: string;
  marginBottom?: string;
}>`
  color: ${({ color = "inherit" }) => color};
  font-size: ${({ fontSize = "md" }) => fontSizes[fontSize]};
  font-weight: ${({ fontWeight = "normal" }) => fontWeight};
  margin-right: ${({ marginRight }) => marginRight};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;
