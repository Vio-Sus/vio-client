import styled from "styled-components";
import { useState,  } from "react";
import React from 'react';

// export default function NavBar({}) {
//   const r = useRouter();

//   const handleLink = (t) => {
//     r.push(t);
//   };

//   return (
//     <NavbarUI>
//       <Logo
//         src="./logo.png"
//         selected={r.pathname == "/"}
//         onClick={() => handleLink("/")}
//         style={{ width: 80 }}
//       ></Logo>
//       <Navigation>
//         <LinkUI selected={r.pathname == "/"} onClick={() => handleLink("/")}>
//         Dashboard
//         </LinkUI>
//         <LinkUI
//           selected={r.pathname == "/dashboard"}
//           onClick={() => handleLink("/dashboard")}
//         >
//           ViewData
//         </LinkUI>
//         <LinkUI
//           selected={r.pathname == "/viewdata"}
//           onClick={() => handleLink("/viewdata")}
//         >
//           Subaccounts
//         </LinkUI>
//     <ButtonUI OnClick={()=> x }>Login</ButtonUI>
//       </Navigation>
//     </NavbarUI>
//   );
// }


const NavbarUI = styled.div`
  padding: 0 3%;
  height: 100px;
  background-color:#E9E9E9;
  display: flex;
  font-family: 'Manrope', sans-serif;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
`;

const Logo = styled.img`
  cursor: pointer;

`;

const Navigation = styled.div`
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
  color: ${(props) => (props.selected ? "#004384" : "#000000")};
  font-weight: ${(props) => (props.selected ? "500" : "300")};
  &:hover {
    color:#489CED;
    ;
  }
`;

const ButtonUI = styled.button`
  font-size: 14px;
  background-color: #C4C4C4;
  font-weight:300;
  color:#000000;
  border-radius: 7.88px;
  height: 27.57pxpx;
  width: 83.51px;
  border: none;
  transition: 0.1s ease;
  cursor: pointer;

  &:hover {
    background-color:#ffffff;
    ;
  }
`;

export default function NavBarLogIn({
  onClick = () => {},
}){
  return (
    <NavbarUI>
      <Logo src="./logo.png" onClick={onClick} style={{ width: 80 }}></Logo>
      <Navigation>
       <LinkUI onClick={onClick}>Dashboard</LinkUI>
       <LinkUI onClick={onClick}>ViewData</LinkUI>
       <LinkUI onClick={onClick}>Subaccounts</LinkUI>
       <ButtonUI onClick={onClick}> Login</ButtonUI>
       </Navigation>
    </NavbarUI>
  );
}


