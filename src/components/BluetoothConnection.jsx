import { useState } from 'react';
import { connectBT, disconnectBT } from '../bluetooth';
import Form from '../components/Entry/AddEntryForm';

export default function BluetoothConnection() {
  const [weight, setWeight] = useState(0);

  return (
    <div>
      <p>{weight}</p>
      <input type="number" value={weight}></input>
      <br></br>
      <button onClick={() => connectBT(setWeight)}>CONNECT BLUETOOTH</button>
      <button onClick={disconnectBT}>DISCONNECT BLUETOOTH</button>
      <Form></Form>
    </div>
  );
}
