import { useState, useEffect } from 'react';
import { updateSource } from '../../common/network';
import styled from 'styled-components';

import Button from '../Button';

const Label = styled.label`
  font-size:14px;
`;

const PopupWrap = styled.form `
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  background-color: #F9F9F9;
  box-shadow: 0px 2px 4px 0px #7474741a;
  border: solid grey 2px;
  position: absolute;
  border-radius: 10px;
  width: 40vw;
  height: 35vh;
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

const editHeader = {
  padding: '10px',
};

const editBody = {
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  padding: '10px',
};

const Heading = styled.div`
  font-size:24px;
  font-weight:400;
  width: 100%;
  color:black;
  display:flex;
  align-items:center;
  justify-content:center;
`;

export default function EditSourceForm({ source, setIsEditing }) {
  // selected entry data
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (!source) {
      return;
    }
    console.log({ source });
    setName(source.name);
    setAddress(source.address);
    setPhoneNumber(source.phone_number);
  }, [source]);

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
      case 'name':
        console.log('name before', name);
        setName(e.target.value);
        console.log('name after', name);
        break;
      case 'address':
        console.log('address before', address);
        setAddress(e.target.value);
        console.log('address after', address);
        break;
      case 'phoneNumber':
        console.log('phoneNumber before', phoneNumber);
        setPhoneNumber(e.target.value);
        console.log('phoneNumber after', phoneNumber);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    let formContent = {
      name,
      address,
      phoneNumber,
    };
    try {
      console.log(`sourceid = ${source.sourceId}`);
      await updateSource(source.source_id, formContent);
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
    <PopupWrap>
      <div className="editHeader" style={editHeader}>
        <Heading>Edit Source</Heading>
      </div>
        <div className="editBody" style={editBody}>
        <form id="edit-form">
          <Label>Name</Label>
            <br/>
          <Input
            name="name"
            type="text"
            value={name}
            onChange={(e) => handleChange(e)}
          />
            <br/>
          <Label>Address</Label>
            <br/>
          <Input
            type="text"
            name="address"
            value={address}
            onInput={(e) => handleChange(e)}
          />
            <br/>
          <Label>Phone Number</Label>
            <br/>
          <Input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onInput={(e) => handleChange(e)}
          />
          <ButtonCont>
              <Button 
                onClick={handleSubmit}
                buttonwidth="150px"
                buttonheight="30px"
                buttoncolor='#80CF76'
                textcolor='white'
                buttontext="Save"
                fontsize="14px"
                textweight='450'
                borderweight='solid #80CF76 1px'
              />
              <Button 
                onClick={handleCancel}
                buttonwidth="150px"
                buttonheight="30px"
                buttontext="Cancel"
                fontsize="14px"
                textweight='500'
                textcolor='#80CF76'
                buttoncolor='white'
                borderweight='solid lightgrey 1px'
              />
            </ButtonCont>
            <br/>
          </form>
        </div>
    </PopupWrap>
  );
}

