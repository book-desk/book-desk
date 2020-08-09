import React from 'react';

import styled from 'styled-components';
import Logo from '../logo/logo';

/* eslint-disable-next-line */
export interface HeaderProps {}

const StyledHeader = styled.div`
  border-bottom: 1px solid #000;
  height: 48px;
  display: flex;
  align-items: center;
`;

const styledLogin = styled.button`
  background-color: red;
`

export const Header = (props: HeaderProps) => {
  return (
    <StyledHeader>
      <Logo></Logo>
    </StyledHeader>
  );
};

export default Header;
