import { useState } from 'react';
import { postSource } from '../../common/network';
import styled from 'styled-components';
import CancelIcon from '@mui/icons-material/Cancel';

const CancelButton = styled.div`
  margin-left: 310px;
  margin-top: 2px;
`;

const Heading = styled.text`
  font-size: 25px;
  font-weight: 400;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  font-size: 12px;
  width: 60%;
`;

const Input = styled.input`
  width: 193.01px;
  height: 39.39px;
  border-radius: 3.94px;
  border: 0.79px solid #b1b1b1;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const SaveSource = styled.button`
  height: 30px;
  width: 120px;
  font-size: 12px;
  margin-top: 3%;
  cursor: pointer;
`;

const Form = styled.form`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
padding: 10px;
};
`;

export default function AddSourceModal({ setIsAddingSource }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const handleChange = (e) => {
    let inputName = e.target.name;
    console.log('inputName: ', inputName, 'inputValue: ', e.target.value);
    switch (inputName) {
      case 'name':
        setName(e.target.value);
        break;
      case 'type':
        setType(e.target.value);
        break;
      case 'phoneNumber':
        setPhoneNumber(e.target.value);
        break;
      case 'address':
        setAddress(e.target.value);
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

  const modal = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#F9F9F9',
    display: 'flex',
    allignItems: 'center',
    justifyContent: 'center',
    zIndex: 6,
    border: '0.79px solid #B1B1B1',
    borderRadius: '7.8px',
  };

  const modalContent = {
    width: '360px',
    height: '550px',
    // boxShadow: "5px 10px 18px #888888",
    border: 'solid 1 #B1B1B1',
    borderRadius: '10px',
  };

  const modalHeader = {
    padding: '10px',
  };

  const modalFooter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-25px',
    padding: '10px',
  };

  const modalBody = {
    padding: '10px',
  };

  return (
    <div className="modal" style={modal}>
      <div className="modalContent" style={modalContent}>
        <div className="modalHeader" style={modalHeader}>
          <CancelButton>
            <CancelIcon sx={{ color: '#C4C4C4' }} onClick={handleCancel}>
              Cancel
            </CancelIcon>
          </CancelButton>
          <Heading>Add a New Source</Heading>
        </div>
        <div className="modalBody" style={modalBody}>
          <Form onSubmit={handleSubmit} id="new-source-form" noValidate>
            <Label>Name</Label>
            <Input
              name="name"
              type="text"
              onChange={(e) => handleChange(e)}
            ></Input>
            <Label>Type</Label>
            <Input
              name="type"
              type="text"
              onChange={(e) => handleChange(e)}
            ></Input>
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              onChange={(e) => handleChange(e)}
            />
            <Label>Address</Label>
            <Input
              name="address"
              type="text"
              onChange={(e) => handleChange(e)}
            ></Input>
             <Label>Email</Label>
            <Input
              type="text"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <SaveSource> Save Source</SaveSource>
            <br />
          </Form>
        </div>
        <div className="modalFooter" style={modalFooter}>
          {msg}
        </div>
      </div>
    </div>
  );
}
