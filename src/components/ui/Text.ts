import styled from "styled-components";

const fontSizes: { [key: string]: string } = {
  xs: "8px",
  sm: "12px",
  md: "18px",
  lg: "24px",
  xl: "30px",
};

export const Text = styled.p<{
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl";
  fontWeight?: string;
  color?: string;
  marginRight?: string;
  marginLeft?: string;
}>`
  color: ${({ color = "inherit" }) => color};
  font-size: ${({ fontSize = "md" }) => fontSizes[fontSize]};
  font-weight: ${({ fontWeight = "normal" }) => fontWeight};
  margin-right: ${({ marginRight }) => marginRight};
  margin-left: ${({ marginLeft }) => marginLeft};
`;
