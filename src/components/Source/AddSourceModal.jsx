import { useState } from 'react';
import { postSource } from '../../common/network';

export default function AddSourceModal({ setIsAddingSource }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [msg, setMsg] = useState('');
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
    backgroundColor: "#F9F9F9",

    display: 'flex',
    allignItems: 'center',
    justifyContent: 'center',
      zIndex:6,
      
 
  };

  const modalContent = {
    width: '600px',
    height: '350px',
    boxShadow: "5px 10px 18px #888888",
    borderRadius: '10px',
  };

  const modalHeader = {
    padding: '10px',
  };

  const modalFooter = {
    padding: '10px',
  };

  const modalBody = {
    padding: '10px',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
  };

  return (
    <div className="modal" style={modal}>
      <div className="modalContent" style={modalContent}>
        <div className="modalHeader" style={modalHeader}>
          <h2>Add a New Source</h2>
        </div>
        <div className="modalBody" style={modalBody}>
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
              <br />
              {msg}
            </div>
          </form>
        </div>
        <div className="modalFooter" style={modalFooter}>
          <button onClick={handleCancel}>Close</button>
        </div>
      </div>
    </div>
  );
}
