import styled from 'styled-components';
import React from 'react';

const FooterUI = styled.div`
  width: 100%;
  height: 53px;
  background-color: #c4c4c4;
  display: flex;
  font-family: 'Manrope', sans-serif;
  align-items: center;
  justify-content: center;
  margin-top: auto;
`;

const FooterNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 470px;
`;

const LinkUI = styled.div`
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  font-weight: 300;
  &:hover {
    color: #489ced;
  }
`;

export default function Footer({ onClick = () => {} }) {
  return (
    <FooterUI>
      <FooterNavigation>
        <LinkUI onClick={onClick}>About Us</LinkUI>
        <LinkUI>Contact Us</LinkUI>
        <LinkUI>How to Sort</LinkUI>
        <LinkUI>Privacy Policy</LinkUI>
      </FooterNavigation>
    </FooterUI>
  );
}
