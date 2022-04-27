import { useState, useEffect } from 'react';
import {
  updateSource,
  checkSourceEmail,
  checkSourcePhone,
} from '../../common/network';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { ValidatePhone, ValidateEmail } from '../../common/validation';

export default function EditSourceForm({ source, setIsEditing }) {
  // selected entry data
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [oldEmail, setOldEmail] = useState('')
  const [oldPhoneNumber, setOldPhoneNumber] = useState('')
  const [sourceId, setSourceId] = useState(null);

  useEffect(() => {
    if (!source) {
      return;
    }
    setSourceId(source.source_id);
    setName(source.name);
    setAddress(source.address);
    setPhoneNumber(source.phone_number);
    setEmail(source.email);
    setOldPhoneNumber(source.phone_number);
    setOldEmail(source.email);
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
  const errorStyle = {
    fontSize: '14px',
    color: 'red',
  };

  const handleChange = (e) => {
    let inputName = e.target.name;
    //console.log('inputName', inputName);
    switch (inputName) {
      case 'name':
        //console.log('name before', name);
        setName(e.target.value);
        //console.log('name after', name);
        break;
      case 'address':
        //console.log('address before', address);
        setAddress(e.target.value);
        //console.log('address after', address);
        break;
      case 'phoneNumber':
        //console.log('phoneNumber before', phoneNumber);
        setPhoneNumber(e.target.value);
        //console.log('phoneNumber after', phoneNumber);
        break;
      case 'email':
        console.log('email before', email);
        setEmail(e.target.value);
        console.log('email after', email);
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
      email,
    };
    if (name.length === 0 || address.length === 0 || email.length === 0) {
      return setMsg(
        'Name, address, and email of source must be filled; Try again'
      );
    }

    // validate phone number
    if (
      phoneNumber !== null &&
      phoneNumber !== '' &&
      phoneNumber !== oldPhoneNumber
    ) {
      if (ValidatePhone(phoneNumber) === false) {
        return setMsg('Invalid phone number; Try again');
      } else if (ValidatePhone(phoneNumber) === true) {
        const res = await checkSourcePhone(phoneNumber);
        if (parseInt(res.data.count) > 0) {
          return setMsg(
            'This phone number is in use. Check to see if the source is already added.'
          );
        }
      }
    }

    // validate email
    if (email !== oldEmail) {
      if (ValidateEmail(email) === false) {
        console.log('invalid emial');
        return setMsg('Invalid Email; Try again');
      } else if (ValidateEmail(email) === true) {
        const res = await checkSourceEmail(email);
        if (parseInt(res.data.count) > 0) {
          return setMsg(
            'This email is in use. Check to see if the source is already added.'
          );
        }
      }
    }

    try {
      console.log("source id " + sourceId);
      await updateSource(sourceId, formContent);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
    //window.location.reload();
  };

  const handleCancel = () => {
    setName(null);
    setAddress(null);
    setPhoneNumber(null);
    setEmail(null);
    setIsEditing(false);
  };

  return (
    <div class="modal">
      <div class="modalContent">
        <div class="modalClose">
          <IconButton
            onClick={handleCancel}
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
                transform: 'scale(1.1)',
              },
            }}
          >
            <CancelIcon />
          </IconButton>
        </div>
        <h2>Edit Source</h2>
        <div>
          <form id="edit-form">
            <div class="flexColumn">
              <label>Name</label>
              <input
                name="name"
                type="text"
                value={name}
                onChange={(e) => handleChange(e)}
              />

              <label>Address</label>
              <input
                type="text"
                name="address"
                value={address}
                onInput={(e) => handleChange(e)}
              />

              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onInput={(e) => handleChange(e)}
              />

              <label>Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onInput={(e) => handleChange(e)}
              />
              <p style={errorStyle}>{msg}</p>
              <div class="buttonCont">
                <button onClick={handleSubmit} class="submitButton">
                  Save Edits
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
