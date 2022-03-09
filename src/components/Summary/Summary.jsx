import { useState, useEffect } from 'react';
import { getTotalWeights } from '../../network';
import ItemTotalWeight from './ItemTotalWeight';
import SourceItemWeight from './SourceItemWeight';

export default function Summary({ startDate, endDate }) {
  const [totalWeightsList, setTotalWeightsList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        let totalWeights = await getTotalWeights(startDate, endDate);
        setTotalWeightsList(totalWeights);
        console.log('This is SUMMARRRYY: ', totalWeightsList);
      } catch {}
    })();
  },[]);
  return (
    <>
      <hr></hr>
      <h2>Summary</h2>
      <ItemTotalWeight totalWeightsList={totalWeightsList} />
      <SourceItemWeight totalWeightsList={totalWeightsList} />
    </>
  );
}
