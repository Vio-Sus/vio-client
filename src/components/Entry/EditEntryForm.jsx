import { useState, useEffect } from 'react';
import { getEntry, updateEntry } from '../../common/network';

export default function EditForm({ entry, setIsEditing, items, sources }) {
  // selected entry data
  const [itemId, setItemId] = useState('');
  const [sourceId, setSourceId] = useState('');
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    if (!entry) {
      return;
    }
    console.log({ entry });
    setItemId(entry.item_id);
    setSourceId(entry.source_id);
    setDate(entry.entry_date);
    setWeight(entry.entry_weight);
  }, [entry]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let [entry] = await Promise.all([getEntry(id)]); // returns new promise with all data
  //       setItemId(entry.item_id);
  //       setSourceId(entry.source_id);
  //       setDate(entry.entry_date);
  //       setWeight(entry.entry_weight);
  //     } catch {}
  //   })();
  // }, [id]);

  const handleChange = (e) => {
    let inputName = e.target.name;
    console.log('inputName', inputName);
    switch (inputName) {
      case 'date':
        console.log('date before', date);
        setDate(e.target.value);
        console.log('date after', date);
        break;
      case 'source':
        setSourceId(Number(e.target.value));
        break;
      case 'item':
        console.log('itemId before', itemId);
        setItemId(Number(e.target.value));
        console.log('itemId after', itemId);
        break;
      case 'weight':
        console.log('weight before', weight);
        setWeight(Number(e.target.value));
        console.log('weight after', weight);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    let formContent = {
      itemId,
      sourceId,
      weight,
      date,
    };
    try {
      await updateEntry(entry.entry_id, formContent);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      <h3>Edit Single Item in Entry</h3>
      <form id="edit-form">
        <label>Collection date:</label>
        <br />
        <input
          name="date"
          type="date"
          value={date}
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
          value={weight}
          onInput={(e) => handleChange(e)}
        />
        <br />
        <button type="button" onClick={handleSubmit}>
          Save Edit
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </>
  );
}
