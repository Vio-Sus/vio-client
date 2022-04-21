import { useState, useEffect } from 'react';
import { postEntries } from '../../common/network';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import styled from 'styled-components';
import EntryDropdown from '../Entry/EntryDropdown';

const InputCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3%;
`;

export default function BluetoothEntryModal({
  setShowForm, sources, items, savedWeight
}) {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    let inputName = e.target.name;
    let formValues;
    console.log('inputName: ', inputName, 'inputValue: ', e.target.value);
    switch (inputName) {
      case 'created':
        formValues[e.target.name] = e.target.value;
        break;
      default:
        formValues[e.target.name] = Number(e.target.value);
        return;
    }
    console.log('handling form changes', formValues);
    setFormValues(formValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = document.getElementById('entry-form');
    let formContent = {
      name,
    };
    console.log(name.length);
    if (name.length == '') {
      setMsg('Name of item must be filled; try again');
    } else {
      try {
        console.log('sending form...', formContent);
        let res = await postEntries(formContent);
        console.log(res);
        form.reset();
        // window.location.reload();
      } catch (error) {
        console.log(error);
      }
      setName(null);
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
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
        <form onSubmit={handleSubmit} id="entry-form" noValidate>
          <div class="flexColumn">
            <InputCont>
              <label for="selectSource">Source</label>
              <EntryDropdown
                objects={sources}
                entryFor="Source"
                handleFormValues={(e) => handleChange(e)}
              ></EntryDropdown>
            </InputCont>

            <InputCont>
              <label for="inputNewDate">Date</label>
              <input
                id="inputNewDate"
                name="created"
                type="date"
                onChange={(e) => handleChange(e)}
              />
            </InputCont>

            <InputCont>
              <label for="selectNewItem">Item</label>
              <EntryDropdown
                name="item_id"
                objects={items}
                entryFor="Item"
                handleFormValues={(e) => handleChange(e)}
              ></EntryDropdown>
            </InputCont>

            <InputCont>
              <label for="inputNewWeight">Weight</label>
              <div class="weightInputCont">
                <input
                  class="weightInput"
                  id="inputNewWeight"
                  type="number"
                  name="weight"
                  placeholder="0"
                  min="0"
                  value={savedWeight}
                  onChange={(e) => handleChange(e)}
                />
                <span class="weightSuffix">kg</span>
              </div>
            </InputCont>

            {msg}
          </div>
          <button class="submitButton" type="submit">
            Save Entry
          </button>
        </form>
      </div>
    </div>
  );
}
