import styled from "styled-components";

const LoginAnchor = styled.a`
  background-color: #c4c4c4;
  border-radius: 7px;
  margin: 5px;
  padding: 4px 20px 6px 20px;
  font-size: 14px;
  color: #000000;
  text-decoration: none;
  &:hover {
    background-color: #ffffff;
  }
`;

const LoginButton = () => {
  return <LoginAnchor href="/login">Log In</LoginAnchor>;
};

export default LoginButton;
