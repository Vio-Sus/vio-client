import { useState } from 'react';
import { postSource } from '../../network';

export default function AddSourceForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
    try {
      console.log('sending form...', formContent);
      let res = await postSource(formContent);
      console.log(res);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    // TODO: closes the form div
  };

  return (
    <>
      <h2>Add a new source</h2>
      <form onSubmit={handleSubmit} id="new-source-form" noValidate>
        <label>Name:</label>
        <input
          name="name"
          type="text"
          onChange={(e) => handleChange(e)}
        ></input>
        <br />
        <label>Address:</label>
        <input
          name="address"
          type="text"
          onChange={(e) => handleChange(e)}
        ></input>
        <br />
        <label>Contact Number:</label>
        <input
          type="text"
          name="phoneNumber"
          onChange={(e) => handleChange(e)}
        />

        <div className="button-section">
          <button className="button submit" type="submit">
            Save Source
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}
