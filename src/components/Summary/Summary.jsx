import { useState, useEffect } from 'react';
import { getTotalWeights } from '../../common/network';
import ItemTotalWeight from './ItemTotalWeight';
import SourceItemWeight from './SourceItemWeight';

export default function Summary({ startDate, endDate }) {
  const [totalWeightsList, setTotalWeightsList] = useState([]);
  useEffect(() => {
    console.log(startDate, endDate);
    (async () => {
      try {
        let totalWeights = await getTotalWeights(startDate, endDate);
        setTotalWeightsList(totalWeights);
        console.log('This is SUMMARRRYY: ', totalWeightsList);
      } catch {}
    })();
  }, []);
  return (
    <>
      <hr></hr>
      <h2>Summary</h2>
      <p>
        {startDate} to {endDate}
      </p>
      {/* <ItemTotalWeight totalWeightsList={totalWeightsList} /> */}
      <SourceItemWeight totalWeightsList={totalWeightsList} />
    </>
  );
}
