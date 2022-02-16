import './App.css';
import { useEffect, useState } from 'react';
import { getSources, getItems, getLoggedInUser } from './network';
import Form from './components/form';
import EntriesList from './components/EntriesList';
import EditForm from './components/EditForm';
import DeleteConfirmation from './components/DeleteConfirmation';

function App() {
  const [sources, setSources] = useState([]);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({});

  const [isEditing, setIsEditing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let [user, sources, items] = await Promise.all([
          getLoggedInUser(),
          getSources(),
          getItems(),
        ]); // returns new promise with all data
        setUser(user);
        setSources(sources);
        setItems(items);
        console.log(user, sources, items);
      } catch {}
    })();
  }, []);

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
    <div className="App">
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
  );
}

export default App;
