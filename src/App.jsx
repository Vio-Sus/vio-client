import './App.css';
import { useEffect, useState } from 'react';
import { getSources, getItems, getLoggedInUser } from './network';
import Form from './components/Form';
import EntriesList from './components/EntriesList';
import EditForm from './components/EditForm';
import DeleteConfirmation from './components/DeleteConfirmation';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

function App() {
  const [sources, setSources] = useState([]);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let [user, sources, items] = await Promise.all([
          getLoggedInUser(),
          getSources(),
          getItems(),
        ]); // returns new promise with all data
        if (!user.error) {
          setUser(user);
        }
        setSources(sources);
        setItems(items);
        console.log(user, sources, items);
      } catch {}
    })();
  }, []);

  const selectEntry = (entry, method) => {
    console.log('Entry selected: ', entry);
    setSelectedEntry(entry);
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
      {user && (
        <div className="App">
          <LogoutButton />
          <br/>
          {JSON.stringify(user)}
          <Form sources={sources} items={items}></Form>
          <EntriesList selectEntry={selectEntry}></EntriesList>
          {isEditing && (
            <EditForm
              entry={selectedEntry}
              setIsEditing={setIsEditing}
              sources={sources}
              items={items}
            />
          )}
          {isDeleting && (
            <DeleteConfirmation
              entry={selectedEntry}
              setIsDeleting={setIsDeleting}
              sources={sources}
              items={items}
            />
          )}
        </div>
      )}
      {!user && <LoginButton />}
    </>
  );
}

export default App;
