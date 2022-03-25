import BluetoothConnection from '../components/BluetoothConnection';
import Form from '../components/Entry/AddEntryForm';
import { useState } from 'react';

const BluetoothPage = ({ sources, items }) => {
  const [btWeight, setBtWeight] = useState(0);
  return (
    <>
      <h1>Bluetooth Test</h1>
      <BluetoothConnection setBtWeight={setBtWeight} />
      <p>bt weight: {btWeight}</p>
      <Form sources={sources} items={items}></Form>
    </>
  );
};

export default BluetoothPage;
