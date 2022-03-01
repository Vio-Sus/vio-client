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
          <th> Item Name </th>
          <th> Weight </th>
          <th> Entry Date </th>
          <th> Source </th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => (
          <tr key={index}>
            <td> {entry.item_name} </td>
            <td> {entry.entry_weight} </td>
            <td> {entry.entry_date} </td>
            <td> {entry.source_name}</td>
            <td>
              <button onClick={() => selectEntry(entry, 'edit')}>
                Edit
              </button>
            </td>

            <td>
              <button onClick={() => selectEntry(entry, 'delete')}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
