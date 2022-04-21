import { useState, useEffect } from 'react';
import { connectBT, disconnectBT } from '../bluetooth';

export default function BluetoothConnection({
  setBtWeight,
  setIsWeighing,
}) {

  const [isConnected, setIsConnected] = useState(false);


  const handleWeighing = () => {
    if (!isConnected) {
      if (connectBT(setBtWeight, setIsConnected)) {
        setIsWeighing(true);
      }
    } else {
      disconnectBT(setIsConnected);
      setIsWeighing(false);
    }
  };

  return (
    <div>
      Bluetooth scale: {!isConnected ? (
        <button onClick={handleWeighing}>Connect</button>
      ) : (
        <button onClick={handleWeighing}>Disconnect</button>
      )}
    </div>
  );
}
