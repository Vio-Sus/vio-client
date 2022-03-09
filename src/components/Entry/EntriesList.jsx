import { useState, useEffect } from 'react';
import { getListOfEntries, getEntriesByDateRange } from '../../network';

export default function EntriesList({ selectEntry, sources, items }) {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [today, setToday] = useState([]);

  const dateToYMD = (date) => {
    let yyyy = date.getFullYear();
    let mm = (date.getMonth() + 1).toString().padStart(2, '0');
    let dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const todayObj = new Date(new Date().toString());

  // useEffect(() => {
  //   getListOfEntries().then((result) => {
  //     console.log(result);
  //     setEntries(result);
  //   });
  // }, []);
  useEffect(() => {
    (async () => {
      try {
        setToday(dateToYMD(todayObj));
        setEndDate(dateToYMD(todayObj));
        let [entries] = await Promise.all([getListOfEntries()]); // returns new promise with all data
        setEntries(entries || []);
        setFilteredEntries(entries || []);
        console.log({ sources });
      } catch {}
    })();
  }, []);

  const dateRangeFilter = () => {
    console.log('start date: ', startDate);
    console.log('end date: ', endDate);
    if (startDate && endDate) {
      // let filtered = entries.filter((entry) => {
      //   if (entry['entry_date'] > startDate && entry['entry_date'] < endDate) {
      //     return entry;
      //   }
      // });
      (async () => {
        try {
          let [entriesDateRange] = await Promise.all([
            getEntriesByDateRange(startDate, endDate),
          ]);
          setEntries(entriesDateRange);
        } catch {}
      })();
    } else {
      setEntries(entries);
    }
  };

  const selectSource = (sourceId) => {
    if (sourceId === 'all') {
      setFilteredEntries(entries);
    } else {
      let filtered = entries.filter((entry) => {
        if (entry['source_id'] === +sourceId) {
          return entry;
        }
      });
      setFilteredEntries(filtered);
    }
  };

  const selectItem = (itemId) => {
    if (itemId === 'all') {
      setFilteredEntries(entries);
    } else {
      let filtered = entries.filter((entry) => {
        if (entry['item_id'] === +itemId) {
          return entry;
        }
      });
      setFilteredEntries(filtered);
    }
  };

  return (
    <>
      Filter by source:
      <select onChange={(e) => selectSource(e.target.value)}>
        <option value="all">All</option>
        {sources.map((source, key) => (
          <option key={key} value={source.source_id}>
            {source.name}
          </option>
        ))}
      </select>
      Filter by item:
      <select onChange={(e) => selectItem(e.target.value)}>
        <option value="all">All</option>
        {items.map((item, key) => (
          <option key={key} value={item.item_id}>
            {item.name}
          </option>
        ))}
      </select>
      <br></br>
      Filter by Date Range:
      <label for="startDate">Start Date</label>
      <input
        type="date"
        name="startDate"
        id="startDate"
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
          dateRangeFilter();
        }}
      />
      <label for="endDate">End Date</label>
      <input
        type="date"
        name="endDate"
        id="endDate"
        value={endDate}
        max={today}
        onChange={(e) => {
          setEndDate(e.target.value);
          dateRangeFilter();
        }}
      />
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
