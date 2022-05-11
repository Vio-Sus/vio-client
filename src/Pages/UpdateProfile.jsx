import { useState } from 'react';
import { updateAccountProfile } from '../common/network';
import { ValidateEmail } from '../common/validation';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  text-align: left;
`;

export default function UpdateProfile({user}) { 
  const [nickname, setNickname] = useState(''); 
  const [company, setCompanyName] = useState('');
  const [msg, setMsg] = useState('');

  console.log("USER" + JSON.stringify(user.user.email).replace(/['"]+/g, ''))
  const handleChange = (e) => {
    let inputName = e.target.name;       
    switch (inputName) {     
      case 'nickname':
        setNickname(e.target.value);
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
      email: JSON.stringify(user.user.email).replace(/['"]+/g, ''),
      company,
    };
    console.log(formContent); 
    if (nickname.length === 0 || company === 0) {
      return setMsg(
        'Name, company, and email of source must be filled; Try again'
      );
    }
   

    try {
      console.log('sending form...', formContent);
      let res = await updateAccountProfile(formContent);
      if(res.data.error) {
        return setMsg(res.data.error);
      } else {
        return setMsg("Profile updated")
      }
      form.reset();     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>     
      <StyledForm onSubmit={handleSubmit} id="new-source-form" noValidate>
      <h2>Update Account Profile</h2>
        <label>Nickname</label>
        <br />
        <input
          name="nickname"
          type="text"
          placeholder="nickname"
          onChange={(e) => handleChange(e)}
        ></input>               
          <br />
        <label>Email</label>
        <br />
        <input
          name="email"
          type="text"
          value={JSON.stringify(user.user.email).replace(/['"]+/g, '')}         
          onChange={(e) => handleChange(e)}
          disabled
        />              
        <br />
        <label>Company Name</label>
        <br />
        <input
          name="company"
          type="text"
          placeholder="company name"
          onChange={(e) => handleChange(e)}
        ></input>               
        <div className="button-section">
          <button className="submitButton" type="submit">
            Update Profile
          </button>         
          <br />
          {msg}
        </div>
      </StyledForm>
    </>
  );
}
