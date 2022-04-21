import { useState, useEffect } from 'react';
import { updateEntry } from '../../common/network';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

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
    <div class="modal">
      <div class="modalContent">
        <div class="modalClose">
          <IconButton
            onClick={handleCancel}
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
                transform: 'scale(1.1)',
              },
            }}
          >
            <CancelIcon />
          </IconButton>
        </div>
        <h2>Edit Entry</h2>
        <form id="edit-form">
          <div class="dropdownCont">
            <div class="flexColumn">
              <label>Sub Account:</label>
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
            </div>
            <div class="flexColumn">
              <label>Collection date:</label>
              <input
                name="date"
                type="date"
                value={date}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
          </div>
          <div class="dropdownCont">
            <div class="flexColumn">
              <label>Material:</label>
              <select
                value={itemId}
                name="item"
                onChange={(e) => handleChange(e)}
              >
                <option hidden>Select Item</option>
                {items.map((item, key) => (
                  <option key={key} value={item.item_id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div class="flexColumn">
              <label>Weight:</label>
              <div class="weightInputCont">
                <input
                  class="weightInput"
                  type="number"
                  name="weight"
                  value={weight}
                  onInput={(e) => handleChange(e)}
                />
                <span class="weightSuffix">kg</span>
              </div>
            </div>
          </div>
          <div class="buttonCont">
            <button onClick={handleSubmit} class="submitButton">
              Save Edits
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
