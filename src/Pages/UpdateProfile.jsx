import { useState } from 'react';
import { updateAccountProfile } from '../common/network';
import { ValidateEmail } from '../common/validation';

export default function UpdateProfile() { 
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompanyName] = useState('');
  const [msg, setMsg] = useState('');
  const handleChange = (e) => {
    let inputName = e.target.name;    
    //console.log('inputName: ', inputName, 'inputValue: ', e.target.value);
    switch (inputName) {     
      case 'nickname':
        setNickname(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'company':
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
      nickname,
      email,
      company,
    };
    console.log(formContent); 
    if (nickname.length === 0 || email.length === 0 || company === 0) {
      return setMsg(
        'Name, company, and email of source must be filled; Try again'
      );
    }
   
    if (ValidateEmail(email) === false) {
      console.log('invalid email');
      return setMsg('Invalid Email; Try again');
    } 

    try {
      console.log('sending form...', formContent);
      let res = await updateAccountProfile(formContent);
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
        <label>Nickname:</label>
        <br />
        <input
          name="nickname"
          type="text"
          onChange={(e) => handleChange(e)}
        ></input>               
          <br />
        <label>Email:</label>
        <br />
        <input
          name="email"
          type="text"         
          onChange={(e) => handleChange(e)}
        />              
        <br />
        <label>Company Name:</label>
        <br />
        <input
          name="company"
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
