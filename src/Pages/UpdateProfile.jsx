import { useState } from 'react';
import { updateAccountType } from '../common/network';
import { ValidateEmail } from '../common/validation';

export default function UpdateProfile() {
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [msg, setMsg] = useState('');
  const handleChange = (e) => {
    let inputName = e.target.name;
    //console.log('inputName: ', inputName, 'inputValue: ', e.target.value);
    switch (inputName) {
      case 'firstname':
        setfName(e.target.value);
        break;
      case 'lastname':
        setlName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'companyname':
        setCompanyName(e.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = document.getElementById('new-source-form');
    let formContent = {
      fname,
      lname,
      email,
      companyName,
    };
    console.log(fname.length); 
    if (fname.length === 0 || lname.length === 0 || email.length === 0 || companyName === 0) {
      return setMsg(
        'Name, address, and email of source must be filled; Try again'
      );
    }
   
    if (ValidateEmail(email) === false) {
      console.log('invalid email');
      return setMsg('Invalid Email; Try again');
    } 

    try {
      console.log('sending form...', formContent);
      let res = await updateAccountType(formContent);
      if(res.data.error) {
        return setMsg(res.data.error);
      }
      form.reset();     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>     
      <form onSubmit={handleSubmit} id="new-source-form" noValidate>
      <h2>Update Account Profile</h2>
        <label>First Name:</label>
        <br />
        <input
          name="firstname"
          type="text"
          onChange={(e) => handleChange(e)}
        ></input>
          <br />
          <label>Last Name:</label>
        <br />
        <input
          name="lastname"
          type="text"
          onChange={(e) => handleChange(e)}
        ></input>
          <br />
        <label>Email:</label>
        <br />
        <input
          type="text"
          name="email"
          onChange={(e) => handleChange(e)}
        />              
        <br />
        <label>Company Name:</label>
        <br />
        <input
          name="companyname"
          type="text"
          onChange={(e) => handleChange(e)}
        ></input>               
        <div className="button-section">
          <button className="button submit" type="submit">
            Update Profile
          </button>         
          <br />
          {msg}
        </div>
      </form>
    </>
  );
}
