import { useState, useEffect } from 'react';
import { getItems, getSources, getEntry, updateEntry } from '../network';

export default function EditForm({ id, setIsEditing }) {
  // selected entry data
  const [entry, setEntry] = useState('');
  const [itemId, setItemId] = useState('');
  const [sourceId, setSourceId] = useState('');
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState(0);

  // naming the dropdown options
  const [sources, setSources] = useState([]);
  const [items, setItems] = useState([]);

  const setEntryStates = (entry) => {
    setItemId(entry.item_id);
    setSourceId(entry.source_id);
    setDate(entry.entry_date);
    setWeight(entry.entry_weight);
  };

  useEffect(() => {
    getEntry(id)
      .then((result) => {
        setEntry(result.data);
        return result.data;
      })
      .then((entry) => {
        setItemId(entry.item_id);
        setSourceId(entry.source_id);
        setDate(entry.entry_date);
        setWeight(entry.entry_weight);
      });
    getSources().then((result) => {
      setSources(result.data);
    });
    getItems().then((result) => {
      setItems(result.data);
    });
  }, []);

  const handleChange = (e) => {
    let inputName = e.target.name;

    switch (inputName) {
      case 'date':
        setDate(e.target.value);
        break;
      case 'source':
        setSourceId(Number(e.target.value));
        break;
      case 'item':
        setItemId(Number(e.target.value));
        break;
      case 'weight':
        setWeight(Number(e.target.value));
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formContent = {
      itemId,
      sourceId,
      weight,
      date,
    };

    updateEntry(id, formContent).then((res) => {
      console.log(res);
      setIsEditing(false);
    });
  };

  return (
    <>
      <h3>Edit Single Item in Entry</h3>
      <form onSubmit={handleSubmit} id="edit-form">
        <label>Collection date:</label>
        <br />
        <input
          name="date"
          type="date"
          value={entry.entry_date}
          onChange={(e) => handleChange(e)}
        ></input>
        <br />
        <label>Source:</label>
        <br />
        <select
          value={sourceId}
          name="source"
          onChange={(e) => handleChange(e)}
        >
          <option hidden>Select Source</option>
          {sources.map((source, key) => (
            <option key={key} value={source.source_id}>
              {source.name}
            </option>
          ))}
        </select>
        <br />
        <label>Item:</label>
        <br />
        <select value={itemId} name="item" onChange={(e) => handleChange(e)}>
          <option hidden>Select Item</option>
          {items.map((item, key) => (
            <option key={key} value={item.item_id}>
              {item.name}
            </option>
          ))}
        </select>
        <br />
        <label>Weight:</label>
        <br />
        <input
          type="number"
          name="weight"
          value={entry.entry_weight}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <button type="submit">Save Edit</button>
      </form>
    </>
  );
}
