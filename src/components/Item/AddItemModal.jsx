import { useState } from 'react';
import { postItem } from '../../common/network';

export default function AddItemModal({ setIsAddingItem }) {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const handleChange = (e) => {
    let inputName = e.target.name;
    console.log('inputName: ', inputName, 'inputValue: ', e.target.value);
    switch (inputName) {
      case 'name':
        setName(e.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = document.getElementById('new-item-form');
    let formContent = {
      name,
    };
    console.log(name.length);
    if (name.length == '') {
      setMsg('Name of item must be filled; try again');
    } else {
      try {
        console.log('sending form...', formContent);
        let res = await postItem(formContent);
        console.log(res);
        form.reset();
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancel = () => {
    setIsAddingItem(false);
  };

  const modal = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    display: 'flex',
    allignItems: 'center',
    justifyContent: 'center',
  };

  const modalContent = {
    minWidth: 'fit-content',
    width: '25%',
    height: 'fit-content',
    padding: '0 2em 1em',
    boxShadow: '5px 10px 18px #888888',
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
          <h2>Add a New Item</h2>
        </div>
        <div className="modalBody" style={modalBody}>
          <form onSubmit={handleSubmit} id="new-item-form" noValidate>
            <label>Name:</label>
            <br />
            <input
              name="name"
              type="text"
              onChange={(e) => handleChange(e)}
            ></input>
            <br />

            <div className="button-section">
              <button className="button submit" type="submit">
                Save Item
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
