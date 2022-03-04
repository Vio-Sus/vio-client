import { useState, useEffect } from 'react';
import { updateSource } from '../../network';

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
      <h2>Edit Source</h2>
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
        <button type="button" onClick={handleSubmit}>
          Save Edit
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </>
  );
}
