import { useState, useEffect } from 'react';
import { calculateTotalsByItem } from '../../common/networkHelpers';

export default function ItemTotalWeight({ totalWeightsList }) {
  const [itemWeights, setItemWeights] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        let res = await calculateTotalsByItem(totalWeightsList);
        setItemWeights(res);
        console.log('THIS IS ITEMTAOLSWEIGHTS: ', totalWeightsList);
      } catch {}
    })();
  }, []);
  return (
    <>
      <table>
        <thead>
          <th>Item Name</th>
          <th>Total Weight</th>
        </thead>

        <tr>
          <td></td>
        </tr>
      </table>
    </>
  );
}
