import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface LogoProps {}

const StyledLogo = styled.div`
  font-size: 2rem;
  font-weight: 300;
`;
const StyledBookSpan = styled.span`
  color: #fff;
  background-color: #000;
`;
const StyledPlaceSpan= styled.span`
  color: #000;
`;
export const Logo = (props: LogoProps) => {
  return (
    <StyledLogo>
      <StyledBookSpan>Book</StyledBookSpan><StyledPlaceSpan>Place</StyledPlaceSpan>
      </StyledLogo>
  );
};

export default Logo;
