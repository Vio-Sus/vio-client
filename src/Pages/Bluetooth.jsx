import BluetoothConnection from '../components/BluetoothConnection';

import { useState, useEffect } from 'react';
import BluetoothEntryModal from '../components/BluetoothEntryForm';

const BluetoothPage = ({ sources, items }) => {
  const [array, setArray] = useState([]);
  const [savedWeight, setSavedWeight] = useState(0);
  const [btWeight, setBtWeight] = useState(0);
  const [isWeighing, setIsWeighing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let arr = array.slice(-100);
    arr.push(btWeight / 2.2);
    setArray(arr);
  }, [btWeight]);

  function avg(arr) {
    return arr.reduce((prev, curr) => prev + curr, 0) / arr.length;
  }
  const saveWeight = () => {
    setSavedWeight(avg(array).toFixed(3));
    console.log('arrraaay after avereage: ', array);
    setIsWeighing(false);
    console.log('saved weight: ', savedWeight);
    setShowForm(true);
  };
  const toggleIsWeighing = () => {
    setIsWeighing(true);
  };
  return (
    <>
      <h1>Bluetooth Test</h1>
      <BluetoothConnection
        setBtWeight={setBtWeight}
        setIsWeighing={setIsWeighing}
        setIsConnected={setIsConnected}
        isConnected={isConnected}
      />
      {isConnected ? (
        <div>
          <input
            type="number"
            value={isWeighing ? (btWeight / 2.2).toFixed(3) : savedWeight}
          ></input>
          {isWeighing ? (
            <button onClick={saveWeight}>Save</button>
          ) : (
            <button onClick={toggleIsWeighing}>Weigh</button>
          )}
        </div>
      ) : (
        <div></div>
      )}
      {showForm && (
        <BluetoothEntryModal
          setShowForm={setShowForm}
          sources={sources}
          items={items}
          savedWeight={savedWeight}
        />
      )}
      <br></br>
      Saved weight: {savedWeight}
    </>
  );
};

export default BluetoothPage;
