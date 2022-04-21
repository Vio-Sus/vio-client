import { useState, useEffect } from 'react';
import { updateItem } from '../../common/network';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

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
        <h2>Edit Item</h2>
        <form onSubmit={handleSubmit} id="edit-form">
          <div class="flexColumn">
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => handleChange(e)}
            ></input>
            <button class="submitButton" type="submit">
              Save Edits
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
