import { useState } from 'react';
import { postSource } from '../../common/network';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

export default function AddSourceModal({ setIsAddingSource }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [msg, setMsg] = useState('');
  const handleChange = (e) => {
    let inputName = e.target.name;
    console.log('inputName: ', inputName, 'inputValue: ', e.target.value);
    switch (inputName) {
      case 'name':
        setName(e.target.value);
        break;
      case 'address':
        setAddress(e.target.value);
        break;
      case 'phoneNumber':
        setPhoneNumber(e.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = document.getElementById('new-source-form');
    let formContent = {
      name,
      address,
      phoneNumber,
    };
    console.log(name.length);
    if (name.length == '' || address.length == '') {
      setMsg('Name and address of source must be filled; try again');
    } else {
      try {
        console.log('sending form...', formContent);
        let res = await postSource(formContent);
        console.log(res);
        form.reset();
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancel = () => {
    setIsAddingSource(false);
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
        <h2>Add a New Source</h2>

          <form onSubmit={handleSubmit} id="new-source-form">
            <div class="flexColumn">
              <label>Name</label>
              <input
                name="name"
                type="text"
                value={name}
                onChange={(e) => handleChange(e)}
              />
              <label>Address</label>
              <input
                name="address"
                type="text"
                value={address}
                onChange={(e) => handleChange(e)}
              />
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => handleChange(e)}
              />
              <div class="buttonCont">
                <button onClick={handleSubmit} class="submitButton">
                  Add Source
                </button>
              </div>
            </div>
          </form>
      </div>
    </div>
  );
}
