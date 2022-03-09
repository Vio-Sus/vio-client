import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Footer({}) {
  const r = useRouter();

  const handleLink = (t) => {
    r.push(t);
  };

  return (
    <FooterUI>
      <FooterNavigation>
        <LinkUI selected={r.pathname == "/"} onClick={() => handleLink("/")}>
        About Us
        </LinkUI>
        <LinkUI
          selected={r.pathname == "/contactus"}
          onClick={() => handleLink("/contactus")}
        >
          Contact Us
        </LinkUI>
        <LinkUI
          selected={r.pathname == "/howtosort"}
          onClick={() => handleLink("/howtosort")}
        >
          How to Sort
        </LinkUI>
        <LinkUI
          selected={r.pathname == "/privacypolicy"}
          onClick={() => handleLink("/privacypolicys")}
        >
          Privacy Policy 
        </LinkUI>
      </FooterNavigation>
    </FooterUI>
  );
}

const FooterUI = styled.div`
  width: 100%;
  height: 53px;
  background-color:#C4C4C4;
  display: flex;
  font-family: 'Manrope', sans-serif;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const FooterNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 470px;
  z-index: 1000;
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
    color:#489CED;
    ;
`;

