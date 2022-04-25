import { useState } from 'react';
import { postSource } from '../../common/network';

export default function AddSourceForm({ setIsAdding }) {
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

  function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }

  function ValidatePhone(phoneNumber) {
    if(phoneNumber.length !== 10) {
      return false
    }
    //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
    var regex = /^[A-Za-z0-9 ]+$/;

    //Validate TextBox value against the Regex.
    var isValid = regex.test(phoneNumber);

    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = document.getElementById('new-source-form');
    let formContent = {
      name,
      address,
      phoneNumber,
      email,
    };
    console.log(name.length);
    if (name.length == 0 || address.length == 0 || email.length == 0) {
      return setMsg('Name, address, and email of source must be filled; Try again');
    }
    if(phoneNumber !== null && phoneNumber !== '') {
      if(ValidatePhone(phoneNumber) === false) {
        return setMsg("Invalid phone number; Try again")
      }
    }
    if (ValidateEmail(email) === false) {
      console.log('invalid emial');
      return setMsg('Invalid Email; Try again');
    }

    try {
      console.log('sending form...', formContent);
      let res = await postSource(formContent);
      console.log(res);
      form.reset();
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return (
    <>
      <h2>Add a new source</h2>
      <form onSubmit={handleSubmit} id="new-source-form" noValidate>
        <label>Name:</label>
        <br />
        <input
          name="name"
          type="text"
          onChange={(e) => handleChange(e)}
        ></input>
        <br />
        <label>Address:</label>
        <br />
        <input
          name="address"
          type="text"
          onChange={(e) => handleChange(e)}
        ></input>
        <br />
        <label>Contact Number:</label>
        <br />
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
          <br />
          {msg}
        </div>
      </form>
    </>
  );
}
