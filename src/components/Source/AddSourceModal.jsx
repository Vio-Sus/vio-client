import { useState } from 'react';
import { postSource } from '../../common/network';
import styled from 'styled-components';
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

  const PopupWrap = styled.form `
  display:flex;
  justify-content:center;
  align-items:center;
`

const CancelButton = styled.div `
  margin-left:310px;
  margin-top:2px;
`

const Heading = styled.text`
  font-size:25px;
  font-weight:400;
  color:black;
  display:flex;
  align-items:center;
  justify-content:center;
`;

const Label = styled.label`
  font-size:12px;
`

const Input = styled.input`
width:193.01px;
height:39.39px;
border-radius:3.94px;
border:0.79px solid #B1B1B1;
margin-top:8px;
margin-bottom:8px;
`;

const SaveSource = styled.button`
  height: 30px;
  width: 120px;
  font-size: 12px;
  cursor: pointer;
`;
  const modal = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "#F9F9F9",
    display: 'flex',
    allignItems: 'center',
    justifyContent: 'center',
    zIndex:6,
    border:'0.79px solid #B1B1B1',
    borderRadius: '7.8px',

  };
  const modalContent = {
    width:'360px',
    height: '390px',
    // boxShadow: "5px 10px 18px #888888",
    border: 'solid 1 #B1B1B1',
    borderRadius: '10px',
  };

  const modalHeader = {
    padding: '10px',
  };

  const modalBody = {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding: '10px',
  };

  const ButtonSection = {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding: '10px',
  };
  
  return (
    <PopupWrap>
    <div className="modal" style={modal}>
      <div className="modalContent" style={modalContent}>
        <div className="modalHeader" style={modalHeader}>
          <CancelButton>
        <CancelIcon sx={{ color: "#C4C4C4" }} onClick={handleCancel}>Cancel</CancelIcon>
        </CancelButton>
        <Heading>Add a New Source</Heading>
          
        </div>
        <div className="modalBody" style={modalBody}>
          <form onSubmit={handleSubmit} id="new-source-form" noValidate>
            <Label>Name</Label>
            <br />
            <Input
              name="name"
              type="text"
              onChange={(e) => handleChange(e)}
            ></Input>
            <br />
            <Label>Address</Label>
            <br />
            <Input
              name="address"
              type="text"
              onChange={(e) => handleChange(e)}
            ></Input>
            <br />
            <Label>Contact Number</Label>
            <br />
            <Input
              type="text"
              name="phoneNumber"
              onChange={(e) => handleChange(e)}
            />

            <div className="ButtonSection" style={ButtonSection}>
              <SaveSource className="button submit" type="submit">
                Save Source
              </SaveSource>
              <br />
              {msg}
            </div>
          </form>
        </div>
      </div>
    </div>
    </PopupWrap>
  );
}
