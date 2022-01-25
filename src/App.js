import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from './components/form';
import Entries from './components/entries';

function App() {
  const [whatever, setWhatever] = useState('');

  useEffect(() => {
    axios
      .get('/api/test')
      .then((result) => result.data)
      .then((data) => setWhatever(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{whatever}</h1>
      <Form></Form>
      <Entries></Entries>
    </div>
  );
}

export default App;
