import { useState, useEffect } from 'react';
import { getListOfEntries } from '../../network';

export default function EntriesList({ selectEntry, sources }) {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
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
        setFilteredEntries(entries || []);
        console.log({ sources });
      } catch {}
    })();
  }, []);

  const selectSource = (sourceId) => {
    if (sourceId == 'all') {
      setFilteredEntries(entries);
    } else {
      let filtered = entries.filter((entry) => {
        if (entry['source_id'] == sourceId) {
          return entry;
        }
      });
      setFilteredEntries(filtered);
    }
  };

  return (
    <>
      Filter by source:
      <select>
        <option onClick={() => selectSource('all')}>All</option>
        {sources.map((source, key) => (
          <option
            key={key}
            value={source.source_id}
            onClick={() => selectSource(source.source_id)}
          >
            {source.name}
          </option>
        ))}
      </select>
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
          {filteredEntries.map((entry, index) => (
            <tr key={index}>
              <td> {entry.entry_date} </td>
              <td> {entry.source_name}</td>
              <td> {entry.item_name} </td>
              <td> {entry.entry_weight} kg </td>
              <td>
                <button onClick={() => selectEntry(entry, 'edit')}>Edit</button>
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
    </>
  );
}
