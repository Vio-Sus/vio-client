import { useState, useEffect } from 'react';
import { getListOfEntries } from '../../network';

export default function EntriesList({ selectEntry }) {
  const [entries, setEntries] = useState([]);
  // useEffect(() => {
  //   getListOfEntries().then((result) => {
  //     console.log(result);
  //     setEntries(result);
  //   });
  // }, []);
  useEffect(() => {
    (async () => {
      try {
        let [entries] = await Promise.all([getListOfEntries()]); // returns new promise with all data
        setEntries(entries || []);
      } catch {}
    })();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th> Entry Date </th>
          <th> Source </th>
          <th> Item Name </th>
          <th> Weight </th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => (
          <tr key={index}>
            <td> {entry.entry_date} </td>
            <td> {entry.source_name}</td>
            <td> {entry.item_name} </td>
            <td> {entry.entry_weight} kg </td>
            <td>
              <button onClick={() => selectEntry(entry, 'edit')}>
                Edit
              </button>
            </td>

            <td>
              <button onClick={() => selectEntry(entry.entry_id, 'delete')}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
