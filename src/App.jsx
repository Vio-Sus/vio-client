import './App.css';
import { useEffect, useState } from 'react';
import { getSources, getItems } from './network';
import Form from './components/Form';
import EntriesList from './components/EntriesList';
import EditForm from './components/EditForm';
import DeleteConfirmation from './components/DeleteConfirmation';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

function App() {
  
  const { isLoading, error } = useAuth0();

  const [sources, setSources] = useState([]);
  const [items, setItems] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  useEffect(() => {
    getSources().then((result) => {
      setSources(result.data);
    });
    getItems().then((result) => {
      setItems(result.data);
    });
  }, []);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  const selectEntry = (entryId, method) => {
    console.log('Entry selected: ', entryId);
    setSelectedEntry(entryId);
    switch (method) {
      case 'edit':
        setIsDeleting(false);
        setIsEditing(true);
        break;
      case 'delete':
        setIsEditing(false);
        setIsDeleting(true);
        break;
      default:
        return;
    }
  };

  return (
    <>
      {isAuthenticated && (
        <div className="App">
          <LogoutButton></LogoutButton>
          <br></br>
          {JSON.stringify(user)}
          <Form sources={sources} items={items}></Form>
          <EntriesList selectEntry={selectEntry}></EntriesList>
          {isEditing && (
            <EditForm
              id={selectedEntry}
              setIsEditing={setIsEditing}
              sources={sources}
              items={items}
            />
          )}
          {isDeleting && (
            <DeleteConfirmation
              id={selectedEntry}
              setIsDeleting={setIsDeleting}
              sources={sources}
              items={items}
            />
          )}
        </div>
      )}
      {!isAuthenticated && <LoginButton />}
    </>
  );
}

export default App;
