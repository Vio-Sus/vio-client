import { useState, useEffect } from 'react';
import { getListOfEntries } from '../network';

export default function Entries() {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    getListOfEntries().then((result) => {
      console.log(result);
      setEntries(result.data);
    });
    // setSources();
  }, []);
  console.log(entries);
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
              <button>Edit</button>
            </td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    // <div>
    //   {entries.map((entry, key) => (
    //     <p key={key}> {entry.item_name} </p>
    //   ))}
    // </div>
  );
}
