import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from './components/form';
import Entries from './components/entries';
import EditForm from './components/EditForm';

function App() {
  const [whatever, setWhatever] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(0);

  useEffect(() => {
    axios
      .get('/api/test')
      .then((result) => result.data)
      .then((data) => setWhatever(data.message));
  }, []);

  const selectEntry = (entryId) => {
    console.log('function called', entryId);
    setSelectedEntry(entryId);
    setIsEditing(true);
  };

  return (
    <div className="App">
      <h1>{whatever}</h1>
      <Form></Form>
      <Entries selectEntry={selectEntry}></Entries>
      {isEditing && <EditForm id={selectedEntry} setIsEditing={setIsEditing} />}
    </div>
  );
}

export default App;
