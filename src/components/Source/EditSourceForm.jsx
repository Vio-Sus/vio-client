import { useState, useEffect } from 'react';
import { updateSource } from '../../common/network';
import styled from 'styled-components';
import CancelIcon from '@mui/icons-material/Cancel';

const Heading = styled.text`
  font-size:24px;
  font-weight:400;
  color:black;
`;

const SaveButton = styled.button`
  height: 30px;
  width: 120px;
  font-size: 12px;
  cursor: pointer;
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
    <>
      <Heading>Edit Source</Heading>
      <form id="edit-form">
        <label>Name:</label>
        <br />
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => handleChange(e)}
        ></input>
        <br />
        <label>Address:</label>
        <br />
        <input
          type="text"
          name="address"
          value={address}
          onInput={(e) => handleChange(e)}
        />
        <br />
        <label>Phone Number:</label>
        <br />
        <input
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onInput={(e) => handleChange(e)}
        />
        <br />
        <SaveButton buttontext="save" onClick={handleSubmit}>
          Save Edit
        </SaveButton>
        <CancelIcon sx={{ color: "#C4C4C4" }} onClick={handleCancel}>Cancel</CancelIcon>
      </form>
    </>
  );
}
