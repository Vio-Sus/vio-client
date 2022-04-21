import { useState, useEffect } from 'react';
import { updateItem } from '../../common/network';

export default function EditItemForm({ item, setIsEditing }) {
  // selected entry data
  const [name, setName] = useState('');

  useEffect(() => {
    if (!item) {
      return;
    }
    console.log({ item });
    setName(item.name);
  }, [item]);

  const handleChange = (e) => {
    let inputName = e.target.name;
    console.log('inputName', inputName);
    switch (inputName) {
      case 'name':
        console.log('name before', name);
        setName(e.target.value);
        console.log('name after', name);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    let formContent = {
      name,
    };
    try {
      console.log(`itemid = ${item.itemId}`);
      await updateItem(item.item_id, formContent);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
    // window.location.reload();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      <h2>Edit Item</h2>
      <form id="edit-form">
        <label>Name:</label>
        <br />
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => handleChange(e)}
        ></input>
        <br />
        <button type="button" onClick={handleSubmit}>
          Save Edit
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </>
  );
}
