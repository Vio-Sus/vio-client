import { useState, useEffect } from 'react';
import { getSources } from '../../network';

export default function SourceList({ selectSource }) {
  const [sources, setSources] = useState([]);
  // useEffect(() => {
  //   getListOfEntries().then((result) => {
  //     console.log(result);
  //     setEntries(result);
  //   });
  // }, []);
  useEffect(() => {
    (async () => {
      try {
        let [sources] = await Promise.all([getSources()]); // returns new promise with all data
        setSources(sources || []);
      } catch {}
    })();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th> Source </th>
          <th> Address </th>
          <th> Phone Number </th>
        </tr>
      </thead>
      <tbody>
        {sources.map((source, index) => (
          <tr key={index}>
            <td> {source.name} </td>
            <td> {source.address} </td>
            <td> {source.phone_number} </td>
            <td>
              <button onClick={() => selectSource(source)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
