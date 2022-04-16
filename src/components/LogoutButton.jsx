import styled from 'styled-components';

const LogoutAnchor = styled.a`
  background-color: none;
  border: solid 1px black;
  border-radius: 5px;
  margin: 5px;
  padding: 4px 15px 6px 15px;
  font-size: 14px;

  color: #000000;
  text-decoration: none;
  &:hover {
    background-color: #ffffff;
  }
`;

const LogoutButton = () => {
  return <LogoutAnchor href="/logout">Sign Out</LogoutAnchor>;
};

export default LogoutButton;
