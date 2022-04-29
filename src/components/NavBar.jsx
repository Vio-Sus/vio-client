import LogoutButton from './LogoutButton';
import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';
import { useState, useEffect } from 'react';

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

const AccountType = styled.p`
  font-weight: 500;
  margin-right: auto;
} 
`;

const ListUI = styled.ul`
  display: flex;
  min-width: 463px;
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

const NavBar = ({ user}) => {

  const [userValue, setUserValue] = useState();
  const newFormValues = localStorage.getItem('newFormValues');
  const ACCOUNT_ID = 19;

  const sourceAccount = 1;
  const collectorAccount = 2;

  useEffect(() => { 
    if(newFormValues == null) {
      setUserValue(0)
    } else {
    setUserValue(Object.values(newFormValues)[ACCOUNT_ID]);
    console.log("USER FROM NAV: " + userValue);
    }
  }, [userValue, newFormValues])
  
  return (
    <>    
      <NavbarUI>
      {userValue == 0 && (
      <ListUI>
      <Logo src="./logo.png" style={{ width: 80 }} />
      <AccountType>Account Selection</AccountType>
      <LinkUI>
              <AnchorUI href="account-type">Account Type</AnchorUI>
      </LinkUI>
      </ListUI>
      )}
      {userValue == sourceAccount && (
        <><Logo src="./logo.png" style={{ width: 80 }} />
          <AccountType>Source Account</AccountType>  
          <ListUI>
            <LinkUI>
              <AnchorUI href="newEntry">New Entry</AnchorUI>
            </LinkUI>
            <LinkUI>
              <AnchorUI href="viewData">Data</AnchorUI>
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
          </ListUI><UserUI>
              <User>
                <PersonIcon fontSize="small" />
                {JSON.stringify(user.user.nickname).replace(/['"]+/g, '')}
              </User>
              <LogoutButton />
            </UserUI></>
         )}
          {userValue == collectorAccount && ( 
          <><Logo src="./logo.png" style={{ width: 80 }} />
          <AccountType>Collector Account</AccountType> 
          <ListUI>
          <LinkUI>
            <AnchorUI href="viewSourceData">Source Data</AnchorUI>
          </LinkUI><LinkUI>
              <AnchorUI href="bluetooth">Bluetooth</AnchorUI>
          </LinkUI>
          </ListUI>
          <UserUI>
              <User>
                <PersonIcon fontSize="small" />
                {JSON.stringify(user.user.nickname).replace(/['"]+/g, '')}
              </User>
              <LogoutButton />
            </UserUI></>
          )}
      </NavbarUI>
   
    </>
  );
};

export default NavBar;
