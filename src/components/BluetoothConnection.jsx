import { useState, useEffect } from 'react';
import { connectBT, disconnectBT } from '../bluetooth';

export default function BluetoothConnection({ setBtWeight }) {
  const [weight, setWeight] = useState(0);
  const [array, setArray] = useState([]);

  useEffect(() => {
    setBtWeight(weight);

    let arr = array.slice(-40);
    arr.push(weight);
    setArray(arr);

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
    setInterval(() => {
      array.push(weight);
      console.log('weightsssssy', array);
    }, 1000);
  };

  return (
    <div>
      <input type="number" value={avg(array).toFixed(3)}></input>
      <br></br>
      <button onClick={() => connectBT(setWeight)}>CONNECT BLUETOOTH</button>
      <button onClick={disconnectBT}>DISCONNECT BLUETOOTH</button>
      <button onClick={saveWeight}>SAVE</button>
    </div>
  );
}
