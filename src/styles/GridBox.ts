import styled from "styled-components";

export const GridBox = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
