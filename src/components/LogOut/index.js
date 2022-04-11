import styled from "styled-components";
import React from "react";

const LogOutUI = styled.div`
width: 100px;
display:flex;
flex-direction: column;
font-family: 'Manrope', sans-serif;
align-items: center;
justify-content: center;
z-index: 1000;
`;

const Avatar = styled.img`
  cursor: pointer;
  vertical-align: middle;
`;

const Username = styled.div`
  font-weight:400;
  color: #000000;
  line-height;15.07px;
  font-size:11px;
`

const LinkUI = styled.div`
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-size: 10px;
  line-height: 13px;
  color: #000000;
  &:hover {
    color:#63B664;
    ;
  }
`;

const LogOut = ({
  onClick = () => {},
}) =>{

return (
    <LogOutUI>
      <Avatar
        src="user.png"
        onClick={() => LogOut("/")}
        style={{ width: 30 }}
      ></Avatar>
      <Username>User Name</Username>
      <LinkUI onClick={onClick}>LogOut</LinkUI>

    </LogOutUI>
    )};

  
  export default LogOut;
