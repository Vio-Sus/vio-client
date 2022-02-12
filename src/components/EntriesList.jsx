import { useState, useEffect } from 'react';
import { getListOfEntries } from '../network';
import { useAuth0 } from '@auth0/auth0-react';

export default function EntriesList({ selectEntry }) {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    getListOfEntries().then((result) => {
      console.log(result);
      setEntries(result.data);
    });
  }, []);

  const { user } = useAuth0();

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
              <button onClick={() => selectEntry(entry.entry_id, 'edit')}>
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
      {JSON.stringify(user.sub)}
    </table>
  );
}
