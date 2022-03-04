import { useState } from 'react';
import { postItem } from '../../network';

export default function AddItemForm({ setIsAdding }) {
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
    setIsAdding(false);
  };

  return (
    <>
      <h2>Add a new item</h2>
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
          <button onClick={handleCancel}>Cancel</button>
          <br />
          {msg}
        </div>
      </form>
    </>
  );
}
