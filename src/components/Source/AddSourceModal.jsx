import { useState } from 'react';
import {
  postSource,
  checkSourcePhone,
} from '../../common/network';
import styled from 'styled-components';
//import CancelIcon from '@mui/icons-material/Cancel';
import Button from '../Button';
import { ValidatePhone, ValidateEmail } from '../../common/validation';

const Label = styled.label`
  font-size: 14px;
`;

const PopupWrap = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  box-shadow: 0px 2px 4px 0px #7474741a;
  border: solid grey 2px;
  position: absolute;
  border-radius: 10px;
  width: 40vw;
  height: 39vh;
`;

const Input = styled.input`
  height: 35px;
  width: 350px;
  padding: 0 5px;
  margin-bottom: 5%;
  border-radius: 7px;
  border: 0.5px solid #cbcbcb;
  box-shadow: 0px 2px 4px 0px #7474741a;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &::-webkit-calendar-picker-indicator {
    opacity: 0;
  }
`;

const ButtonCont = styled.div`
  gap: 40px;
  display: flex;
  justify-content: center;
`;

const Heading = styled.text`
  font-size: 25px;
  font-weight: 400;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const modalHeader = {
  padding: '10px',
};

const modalBody = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
};

const errorStyle = {
  fontSize: '14px',
  color: 'red',
};

export default function AddSourceModal({
  setIsAddingSource,
  setAddedSomething,
  addedSomething,
}) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    let inputName = e.target.name;
    //console.log('inputName: ', inputName, 'inputValue: ', e.target.value);
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
      case 'email':
        setEmail(e.target.value);
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
      email,
    };
    //console.log(name.length);
    if (name.length === 0 || address.length === 0 || email.length === 0) {
      return setMsg(
        'Name, address, and email of source must be filled; Try again'
      );
    }
    if (phoneNumber !== null && phoneNumber !== '') {
      if (ValidatePhone(phoneNumber) === false) {
        return setMsg('Invalid phone number; Try again');
      } 
      else if (ValidatePhone(phoneNumber) === true) {
        const res = await checkSourcePhone(phoneNumber);
        if (parseInt(res.data.count) > 0) {
          return setMsg(
            'This phone number is in use. Check to see if the source is already added.'
          );
        }
      }
    }
    if (ValidateEmail(email) === false) {
      console.log('invalid emial');
      return setMsg('Invalid Email; Try again');
    } 
    // else if (ValidateEmail(email) === true) {
    //   const res = await checkSourceEmail(email);
    //   console.log(res)
    //   if (parseInt(res.data.count) > 0) {
    //     return setMsg(
    //       'This email is in use. Check to see if the source is already added.'
    //     );
    //   }
    // }

    try {
      console.log('sending form...', formContent);
      let res = await postSource(formContent);
      if(res.data.error) {
        return setMsg(res.data.error);
      }
      form.reset();
      window.location.reload();
    } catch (error) {
      console.log(error);
      return setMsg(error.message);
    }
    // setAddedSomething(!addedSomething);
    setName(null);
    setAddress(null);
    setPhoneNumber(null);
    setEmail(null);
    setIsAddingSource(false);
  };

  const handleCancel = () => {
    setName(null);
    setAddress(null);
    setPhoneNumber(null);
    setEmail(null);
    setIsAddingSource(false);
  };

  return (
    <PopupWrap>
      <div className="modalHeader" style={modalHeader}>
        <Heading>Add a New Source</Heading>
      </div>
      <div className="modalBody" style={modalBody}>
        <form onSubmit={handleSubmit} id="new-source-form">
          <Label>Name</Label>
          <br />
          <Input
            name="name"
            type="text"
            value={name}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <Label>Address</Label>
          <br />
          <Input
            name="address"
            type="text"
            value={address}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <Label>Phone Number</Label>
          <br />
          <Input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <Label>Email</Label>
          <br />
          <Input
            type="text"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
          />
          <p style={errorStyle}>{msg}</p>
          <ButtonCont>
            <Button
              onClick={handleSubmit}
              buttonwidth="150px"
              buttonheight="30px"
              buttoncolor="#80CF76"
              textcolor="white"
              buttontext="Add"
              fontsize="14px"
              textweight="450"
              borderweight="solid #80CF76 1px"
            />
            <Button
              onClick={handleCancel}
              buttonwidth="150px"
              buttonheight="30px"
              buttontext="Cancel"
              fontsize="14px"
              textweight="500"
              textcolor="#80CF76"
              buttoncolor="white"
              borderweight="solid lightgrey 1px"
            />
          </ButtonCont>
          <br />
        </form>
      </div>
    </PopupWrap>
  );
}
