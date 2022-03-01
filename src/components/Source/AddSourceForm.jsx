import { useState } from 'react';
import { postEntries } from '../../network';
import { handleValidation } from '../../validation';

const newSource = () => ({
  name: '',
  address: '',
  phoneNumber: '',
});

export default function SourceForm({ items, sources }) {
  const [entryWeights, setEntryWeights] = useState([newEntryWeight()]);
  const [formValues, setFormValues] = useState({});
  const [errorMsgs, setErrorMsgs] = useState([]);

  let handleFormValues = (e) => {
    // copying the original state
    let newFormValues = formValues;
    // adding onto the copy
    if (e.target.name === 'created') {
      newFormValues[e.target.name] = e.target.value;
    } else {
      newFormValues[e.target.name] = Number(e.target.value);
    }
    console.log('handling form changes', newFormValues);
    // setting the state from the original to the new copy
    setFormValues(newFormValues);
  };

  let removeFormFields = (element) => {
    let newEntryWeights = entryWeights.filter(
      (weight) => weight.id != element.id
    );
    setEntryWeights(newEntryWeights);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    let form = document.getElementById('input-form');
    let errorMsgs = handleValidation(formValues, entryWeights, items); // ['error messages']
    setErrorMsgs(errorMsgs);
    console.log(errorMsgs);
    let isValid = errorMsgs.length === 0;
    console.log('is this valid?', isValid);
    if (!isValid) {
      console.log('Form is missing values; try again');
    } else {
      let formContent = {
        entries: entryWeights.map((e) => ({ ...e, ...formValues })),
      };
      console.log(formContent);
      const res = await postEntries(formContent);
      console.log(res);
      form.reset();
      window.location.reload();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="input-form" noValidate>
        <label>Name</label>
        <input
          name="name"
          type="text"
          onChange={(e) => handleFormValues(e)}
        ></input>
        <br />
        <label>Address</label>
        <input
          name="address"
          type="text"
          onChange={(e) => handleFormValues(e)}
        ></input>
        <label>Phone Number</label>
        <input
          name="phoneNumber"
          type="text"
          onChange={(e) => handleFormValues(e)}
        ></input>
        <br />

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
