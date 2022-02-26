import { useState } from 'react';
import { postSource } from '../../network';
// import { handleValidation } from '../../validation';

export default function AddSourceForm({ items, sources }) {
  const [formValues, setFormValues] = useState({});
  const [errorMsgs, setErrorMsgs] = useState([]);

  let handleFormValues = (e) => {

  };

  let handleSubmit = async (event) => {

  };

  return (
    <>
      <h2>Add a new source</h2>
      <form onSubmit={handleSubmit} id="input-form" noValidate>
        <label>Name:</label>
        <input
          name="name"
          type="text"
          onChange={(e) => handleFormValues(e)}
        ></input>
        <br />
        <label>Address:</label>
        <input
          name="name"
          type="text"
          onChange={(e) => handleFormValues(e)}
        ></input>
        <br />
        {entryWeights.map((element, index) => (
          <div className="form-inline" key={element.id}>
            <label>Item</label>
            <input></input>
            <label>Weight</label>
            <input
              type="number"
              name="weight"
              onChange={(e) => {
                element.weight = Number(e.target.value);
              }}
            />
          </div>
        ))}
        <div className="error-messages">
          {errorMsgs.map((msg, key) => (
            <span key={key}>{msg}</span>
          ))}
        </div>

        <div className="button-section">
          <button className="button submit" type="submit">
            Save Source
          </button>
        </div>
      </form>
    </>
  );
}
