import { useState } from 'react';
import { connectBT, disconnectBT } from '../bluetooth';

export default function BluetoothConnection() {
  const [weight, setWeight] = useState(0);

  return (
    <div>
      <p>{weight}</p>
      <button onClick={() => connectBT(setWeight)}>CONNECT BLUETOOTH</button>
      <button onClick={disconnectBT}>DISCONNECT BLUETOOTH</button>
    </div>
  );
}
