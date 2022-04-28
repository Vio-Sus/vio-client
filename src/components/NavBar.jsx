import LogoutButton from './LogoutButton';
import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';

const NavbarUI = styled.div`
  padding: 0 3%;
  height: 80px;
  background-color: #e1eedd;
  display: flex;
  align-items: center;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    height: auto;
    gap: 10px;
  }
`;

const Logo = styled.img`
  cursor: pointer;
  margin-right: auto;
  @media screen and (max-width: 600px) {
    margin: auto;
  }
`;

const ListUI = styled.ul`
  display: flex;
  min-width: 343px;
  padding: 0;
  gap: 5%;
`;

const LinkUI = styled.li`
  cursor: pointer;
  color: #000;
  margin: 0;
  padding: 0;
  list-style: none;
  color: ${(props) => (props.selected ? '#004384' : '#000000')};
  font-weight: ${(props) => (props.selected ? '500' : '300')};
  &:hover {
    color: #489ced;
  }
`;

const AnchorUI = styled.a`
  color: #000;
  text-decoration: none;
  &:visited {
    color: black;
  }
  &:hover {
    color: #489ced;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-template-rows: 1fr 1fr;
`;

const UserUI = styled(User)`
  flex-direction: column;
  margin-left: 10%;
  @media screen and (max-width: 600px) {
    margin: auto;
  }
`;

const NavBar = ({ user }) => {
  return (
    <>
      <NavbarUI>
        <Logo src="./logo.png" style={{ width: 80 }} />
        <ListUI>
          {/* <LinkUI>
            <AnchorUI href="/">Dashboard</AnchorUI>
          </LinkUI> */}
          <LinkUI>
            <AnchorUI href="newEntry">New Entry</AnchorUI>
          </LinkUI>
          <LinkUI>
            <AnchorUI href="viewData">Data</AnchorUI>
          </LinkUI>
          <LinkUI>
            <AnchorUI href="viewSourceData">Source Data</AnchorUI>
          </LinkUI>
          <LinkUI>
            <AnchorUI href="viewSource">Sources</AnchorUI>
          </LinkUI>
          <LinkUI>
            <AnchorUI href="viewItem">Items</AnchorUI>
          </LinkUI>
          <LinkUI>
            <AnchorUI href="bluetooth">Bluetooth</AnchorUI>
          </LinkUI>
        </ListUI>
        <UserUI>
          <User>
            <PersonIcon fontSize="small" />
            {JSON.stringify(user.user.nickname).replace(/['"]+/g, '')}
          </User>
          <LogoutButton />
        </UserUI>
      </NavbarUI>
    </>
  );
};

export default NavBar;
