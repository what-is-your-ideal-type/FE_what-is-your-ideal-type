import styled, {css} from 'styled-components';

interface FlexBoxProps {
  direction?: 'column' | 'row';
  isResponsive?: boolean;
  gap?: string;
}

export const FlexBox = styled.section<FlexBoxProps>`
  display: flex;
  flex-direction: ${({direction}) => direction || 'row'};
  align-items: center;
  gap: ${({gap}) => gap || '0px'};

  ${({isResponsive = false}) =>
    isResponsive &&
    css`
      @media (min-width: 768px) {
        flex-direction: row;
      }
    `}
`;
