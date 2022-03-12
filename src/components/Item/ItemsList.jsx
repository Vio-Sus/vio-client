import { useState, useEffect } from 'react';
import { getItems } from '../../common/network';

export default function ItemList({ selectItem }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        let [items] = await Promise.all([getItems()]); // returns new promise with all data
        setItems(items || []);
      } catch {}
    })();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th> Item </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td> {item.name} </td>
            <td>
              <button onClick={() => selectItem(item)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
