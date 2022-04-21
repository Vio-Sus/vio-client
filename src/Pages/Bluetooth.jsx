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
    // setBtWeight(weight);
    let arr = array.slice(-40);
    arr.push(btWeight);
    setArray(arr);
    setAverage(avg(array).toFixed(3));

    // if (array.length < 100) {
    //   setArray([...array, weight]);
    //   console.log('weightsssssy', array);
    // } else {
    // }

    // do {
    // } while (array.length < 10);
  }, [weight]);

  function avg(arr) {
    return arr.reduce((prev, curr) => prev + curr, 0) / arr.length;
  }
  const saveWeight = () => {
    setSavedWeight(avg(array).toFixed(3));
    setIsWeighing(false);
  };
  return (
    <>
      <h1>Bluetooth Test</h1>
      <BluetoothConnection
        setBtWeight={setBtWeight}
        setIsWeighing={setIsWeighing}
      />
      <p>bt weight: {btWeight}</p>
      {isWeighing ? 'true' : 'fales'}
      {isWeighing ? (
        <input type="number" value={btWeight}></input>
      ) : (
        <input type="number" value={savedWeight}></input>
      )}
      <button onClick={saveWeight}>SAVE</button>
    </>
  );
};

export default BluetoothPage;
