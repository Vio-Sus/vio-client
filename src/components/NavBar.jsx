import LogoutButton from './LogoutButton';
import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';

const NavbarUI = styled.div`
  padding: 0 3%;
  height: 100px;
  background-color: #e9e9e9;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
    gap: 10px;
  }
`;

const Logo = styled.img`
  cursor: pointer;
  margin-right: auto;
  @media (max-width: 900px) {
    margin: auto;
  }
`;

const ListUI = styled.ul`
  display: flex;
  min-width: 600px;
  gap: 3%;
  @media (max-width: 900px) {
    display: contents;
  }
`;

const LinkUI = styled.li`
  cursor: pointer;
  color: #000000;
  list-style: none;
  color: ${(props) => (props.selected ? '#004384' : '#000000')};
  font-weight: ${(props) => (props.selected ? '500' : '300')};
  &:hover {
    color: #489ced;
  }
`;

const AnchorUI = styled.a`
  color: #000000;
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
`;

const NavBar = ({ user }) => {
  return (
    <>
      <NavbarUI>
        <Logo src="./logo.png" style={{ width: 80 }} />
        <ListUI>
          <LinkUI>
            <AnchorUI href="/">Dashboard</AnchorUI>
          </LinkUI>
          <LinkUI>
            <AnchorUI href="newEntry">New Entry</AnchorUI>
          </LinkUI>
          <LinkUI>
            <AnchorUI href="viewData">View Data</AnchorUI>
          </LinkUI>
          <LinkUI>
            <AnchorUI href="viewSource">View Sources</AnchorUI>
          </LinkUI>
          <LinkUI>
            <AnchorUI href="viewItem">View Items</AnchorUI>
          </LinkUI>
          <LinkUI>
            <AnchorUI href="viewGraph">View Graph</AnchorUI>
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
