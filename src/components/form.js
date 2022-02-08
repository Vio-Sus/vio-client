import { useEffect, useState } from 'react';
import { getItems, getSources, postEntries } from '../network';
import { handleValidation } from '../validation';

export default function Form(props) {
  const [sources, setSources] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    getSources().then((result) => {
      console.log('Sources', result.data);
      setSources(result.data);
    });
    getItems().then((result) => {
      // console.log('Items', result);
      setItems(result.data);
    });
  }, []);

  const [entryWeights, setEntryWeights] = useState([
    { item_id: '', weight: '' },
  ]);

  const [formValues, setFormValues] = useState({});

  const [errorMsgs, setErrorMsgs] = useState([]);

  let handleChange = (e, i) => {
    let newEntryWeights = [...entryWeights];
    newEntryWeights[i][e.target.name] = Number(e.target.value);
    console.log('handling entry changes', newEntryWeights);
    setEntryWeights(newEntryWeights);
  };

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

  let addFormFields = () => {
    setEntryWeights([...entryWeights, { item_id: '', weight: '' }]);
  };

  let removeFormFields = (i) => {
    let newEntryWeights = [...entryWeights];
    newEntryWeights.splice(i, 1);
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
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="input-form">
        <label>Start date:</label>
        <input
          name="created"
          type="date"
          onChange={(e) => handleFormValues(e)}
        ></input>
        <br />
        <label>Source</label>
        <select name="source_id" onChange={(e) => handleFormValues(e)}>
          <option hidden>Select Source</option>
          {sources.map((source, key) => (
            <option key={key} value={source.source_id}>
              {source.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        {entryWeights.map((element, index) => (
          <div className="form-inline" key={index}>
            <label>Item</label>
            <select name="item_id" onChange={(e) => handleChange(e, index)}>
              <option hidden>Select Item</option>
              {items.map((item) => (
                <option key={item.item_id} value={item.item_id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label>Weight</label>
            <input
              type="number"
              name="weight"
              onChange={(e) => handleChange(e, index)}
            />

            {index ? (
              <button
                type="button"
                className="button remove"
                onClick={() => removeFormFields(index)}
              >
                Remove
              </button>
            ) : null}
          </div>
        ))}
        <div className="error-messages">
          {errorMsgs.map((msg, key) => (
            <span key={key}>{msg}</span>
          ))}
        </div>

        <div className="button-section">
          <button
            className="button add"
            type="button"
            onClick={() => addFormFields()}
          >
            +
          </button>
          <br />
          <button className="button submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
