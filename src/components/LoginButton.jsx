import styled from "styled-components";

const LoginAnchor = styled.a`
  background-color: none;
  border: solid 1px black;
  border-radius: 5px;
  margin: 5px;
  padding: 4px 20px 6px 20px;
  font-size: 12px;
  color: #000000;
  text-decoration: none;
  &:hover {
    background-color: #ffffff;
  }
`;

const LoginButton = () => {
  return <LoginAnchor href="/login">Sign In</LoginAnchor>;
};

export default LoginButton;
