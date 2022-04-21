import { useState } from 'react';
import { postItem } from '../../common/network';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: #464646;
`;

const Input = styled.input`
  display: block;
  height: 35px;
  width: 140px;
  margin-top: 5px;
  padding: 0 5px;
  border-radius: 7px;
  border: 0.5px solid #cbcbcb;
  box-shadow: 0px 2px 4px 0px #7474741a;
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 30px;
  margin-top: 20px;
  background-color: #80cf76;
  font-size: 12px;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 4px 0px #7474741a;
  :hover {
    cursor: pointer;
  }
`;

const CloseModal = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
`;

export default function AddItemModal({
  setIsAddingItem,
  addedSomething,
  setAddedSomething,
}) {
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
        // window.location.reload();
      } catch (error) {
        console.log(error);
      }
      setAddedSomething(!addedSomething);
      setName(null);
      setIsAddingItem(false);
    }
  };

  const handleCancel = () => {
    setIsAddingItem(false);
  };

  const modal = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    allignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
  };

  const modalContent = {
    minWidth: 'fit-content',
    width: '25%',
    height: 'fit-content',
    padding: '0 3em 2em 2em',
    boxShadow: '5px 10px 18px #888888',
    borderRadius: '10px',
  };

  return (
    <div className="modal" style={modal}>
      <div className="modalContent" style={modalContent}>
        <CloseModal>
          <IconButton onClick={handleCancel}>
            <CancelIcon sx={{ '&:hover': { color: '#80cf76' } }} />
          </IconButton>
        </CloseModal>
        <h2>Add a New Item</h2>
        <form onSubmit={handleSubmit} id="new-item-form" noValidate>
          <Label>Name</Label>
          <Input name="name" type="text" onChange={(e) => handleChange(e)} />
          {msg}
          <SubmitButton className="button submit" type="submit">
            Save Item
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
