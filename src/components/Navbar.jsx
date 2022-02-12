import LoginButton from './LoginButton';

import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  return (<>
    <LoginButton></LoginButton>
  </>);
}

export default Navbar;