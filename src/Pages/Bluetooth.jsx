import BluetoothConnection from '../components/BluetoothConnection';

import { useState, useEffect } from 'react';

const BluetoothPage = ({ sources, items }) => {
  const [weight, setWeight] = useState(0);
  const [array, setArray] = useState([]);
  const [savedWeight, setSavedWeight] = useState(0);
  const [average, setAverage] = useState(0);
  const [btWeight, setBtWeight] = useState(0);
  const [isWeighing, setIsWeighing] = useState(false);

  useEffect(() => {

    let arr = array.slice(-100);
    arr.push(btWeight);
    setArray(arr);

  }, [btWeight]);

  function avg(arr) {
    return arr.reduce((prev, curr) => prev + curr, 0) / arr.length;
  }
  const saveWeight = () => {
    console.log('arrraaay before avereage: ', array);
    setSavedWeight(avg(array).toFixed(3));
    console.log('arrraaay after avereage: ', array);
    setIsWeighing(false);
    console.log('saved weight: ', savedWeight)
  };
  return (
    <>
      <h1>Bluetooth Test</h1>
      <BluetoothConnection
        setBtWeight={setBtWeight}
        setIsWeighing={setIsWeighing}
      />
      <p>bt weight: {btWeight}</p>
      {isWeighing ? 'true' : 'false'}
      {isWeighing ? (
        <input type="number" value={btWeight}></input>
      ) : (
        <input type="number" value={savedWeight}></input>
      )}
      <button onClick={saveWeight}>SAVE</button>
      Saved weight:
      <input type="number" value={savedWeight}></input>
    </>
  );
};

export default BluetoothPage;
