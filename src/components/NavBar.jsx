import LogoutButton from './LogoutButton';

const NavBar = ({ user }) => {
  return (
    <>
      <LogoutButton />
      <h3>user: {JSON.stringify(user.user.nickname).replace(/['"]+/g, '')}</h3>
      <ul>
        <li>
          <a href="/">Dashboard</a>
        </li>
        <li>
          <a href="newEntry">New Entry</a>
        </li>
        <li>
          <a href="viewData">View Data</a>
        </li>
        <li>
          <a href="viewSource">View Sources</a>
        </li>
        <li>
          <a href="viewItem">View Items</a>
        </li>
      </ul>
    </>
  );
};

export default NavBar;
