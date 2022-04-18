import { useState, useEffect } from 'react';
import { updateSource } from '../../common/network';
import styled from 'styled-components';
import CancelIcon from '@mui/icons-material/Cancel';

const PopupWrap = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  width:60%;
`;

const Input = styled.input`
  width: 193.01px;
  height: 39.39px;
  border-radius: 3.94px;
  border: 0.79px solid #b1b1b1;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const SaveButton = styled.button`
  height: 30px;
  width: 120px;
  font-size: 12px;
  cursor: pointer;
`;

const edit = {
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
const editContent = {
  width: '360px',
  height: '520px',
  // boxShadow: "5px 10px 18px #888888",
  border: 'solid 1 #B1B1B1',
  borderRadius: '10px',
};

const editHeader = {
  padding: '10px',
};

const editBody = {
  padding: '2px',
};

const ButtonSection = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
};

const Form = styled.form `
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
padding: 10px;
};
`

export default function EditSourceForm({ source, setIsEditing }) {
  // selected entry data
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  // const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!source) {
      return;
    }
    console.log({ source });
    setName(source.name);
    setType(source.type);
    setPhoneNumber(source.phone_number);
    setAddress(source.address);
    setEmail(source.email);
    // setNotes(source.notes);
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
      case 'type':
        console.log('type before', type);
        setType(e.target.value);
        console.log('type after', type);
        break;
      case 'phoneNumber':
        console.log('phoneNumber before', phoneNumber);
        setPhoneNumber(e.target.value);
        console.log('phoneNumber after', phoneNumber);
        break;
      case 'address':
        console.log('address before', address);
        setAddress(e.target.value);
        console.log('address after', address);
        break;
      case 'email':
        console.log('email before', email);
        setEmail(e.target.value);
        console.log('email after', email);
        break;
      // case 'notes':
      // console.log('notes before', notes);
      // setNotes(e.target.value);
      // console.log('notes after', notes);
      // break;
      default:
        return;
    }
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    let formContent = {
      name,
      type,
      phoneNumber,
      address,
      email,
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
      <div className="edit" style={edit}>
        <div className="editContent" style={editContent}>
          <div className="editHeader" style={editHeader}>
            <CancelButton>
              <CancelIcon sx={{ color: '#C4C4C4' }} onClick={handleCancel}>
                Cancel
              </CancelIcon>
            </CancelButton>
            <Heading>Edit Source</Heading>
          </div>
          <div className="editBody" style={editBody}>
            <Form id="edit-form">
              <Label>Name</Label>
              <Input
                name="name"
                type="text"
                value={name}
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
                value={phoneNumber}
                onInput={(e) => handleChange(e)}
              />
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                value={address}
                onInput={(e) => handleChange(e)}
              />
              <Label>Email</Label>
            <Input
              name="email"
              type="text"
              onChange={(e) => handleChange(e)}
            ></Input>

              <div className="ButtonSection" style={ButtonSection}>
                <SaveButton buttontext="save" onClick={handleSubmit}>
                  Save Edit
                </SaveButton>

              </div>
            </Form>
          </div>
        </div>
      </div>
    </PopupWrap>
  );
}
