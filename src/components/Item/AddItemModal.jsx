import { useState } from 'react';
import { postItem } from '../../common/network';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

export default function AddItemModal({ setIsAddingItem }) {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const handleChange = (e) => {
    let inputName = e.target.name;
    console.log('inputName: ', inputName, 'inputValue: ', e.target.value);
    switch (inputName) {
      case 'name':
        setName(e.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = document.getElementById('new-item-form');
    let formContent = {
      name,
    };
    console.log(name.length);
    if (name.length == '') {
      setMsg('Name of item must be filled; try again');
    } else {
      try {
        console.log('sending form...', formContent);
        let res = await postItem(formContent);
        console.log(res);
        form.reset();
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancel = () => {
    setIsAddingItem(false);
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
        <h2>Add a New Item</h2>
        <form onSubmit={handleSubmit} id="new-item-form" noValidate>
          <div class="flexColumn">
            <label>Name</label>
            <input name="name" type="text" onChange={(e) => handleChange(e)} />
            {msg}
          </div>
          <button class="submitButton" type="submit">
            Save Item
          </button>
        </form>
      </div>
    </div>
  );
}
