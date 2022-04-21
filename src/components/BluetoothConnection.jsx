import { useState, useEffect } from 'react';
import { connectBT, disconnectBT } from '../bluetooth';

export default function BluetoothConnection({
  setBtWeight,
  isWeighing,
  setIsWeighing,
}) {
  const [weight, setWeight] = useState(0);
  const [array, setArray] = useState([]);
  const [savedWeight, setSavedWeight] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setBtWeight(weight);
    console.log('isweighing is.......', isWeighing);
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

  // const saveWeight = () => {
  //   setInterval(() => {
  //     array.push(weight);
  //     console.log('weightsssssy', array);
  //   }, 1000);
  // };

  const saveWeight = () => {
    setSavedWeight(avg(array).toFixed(3));
    setIsWeighing(false);
  };
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
      {/* <input type="number" value={avg(array).toFixed(3)}></input>
      <input type="number" value={savedWeight}></input> */}
      <br></br>
      {!isConnected ? (
        <button onClick={handleWeighing}>CONNECT BLUETOOTH</button>
      ) : (
        <button onClick={handleWeighing}>DISCONNECT BLUETOOTH</button>
      )}
    </div>
  );
}
