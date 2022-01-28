import { useEffect, useState } from 'react';
import { getItems, getSources, postEntries } from '../network';

export default function Form() {
  const [sources, setSources] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    getSources().then((result) => {
      console.log('Sources', result);
      setSources(result.data);
    });
    getItems().then((result) => {
      // console.log('Items', result);
      setItems(result.data);
    });
  }, []);

  const [entryWeights, setEntryWeights] = useState([{ item: '', weight: '' }]);

  const [formValues, setFormValues] = useState({});

  const [errorMsgs, setErrorMsgs] = useState([]);

  const [isValid, setIsValid] = useState(false);

  let handleChange = (i, e) => {
    let newEntryWeights = [...entryWeights];
    newEntryWeights[i][e.target.name] = Number(e.target.value);
    console.log('handling entry changes', newEntryWeights);
    setEntryWeights(newEntryWeights);
  };

  let handleFormValues = (e) => {
    // copying the original state
    let newFormValues = formValues;
    // adding onto the copy
    if (e.target.name === 'date') {
      newFormValues[e.target.name] = e.target.value;
    } else {
      newFormValues[e.target.name] = Number(e.target.value);
    }
    console.log('handling form changes', newFormValues);
    // setting the state from the original to the new copy
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setEntryWeights([...entryWeights, { item: '', weight: '' }]);
  };

  let removeFormFields = (i) => {
    let newEntryWeights = [...entryWeights];
    newEntryWeights.splice(i, 1);
    setEntryWeights(newEntryWeights);
  };

  let checkIfValid = () =>
    errorMsgs.length === 0 ? setIsValid(true) : setIsValid(false);

  let handleValidation = async () => {
    let err = [];
    if (!formValues.date) {
      err.push('A date is missing');
      setIsValid(false);
    }
    if (!formValues.source) {
      err.push('A source is missing');
      setIsValid(false);
    }
    if (entryWeights[0].item === '' && entryWeights[0].weight === '') {
      err.push('There are no entries to submit');
      setIsValid(false);
    } else {
      for (let i = 0; i < entryWeights.length; i++) {
        const entry = entryWeights[i];
        if (entry.item !== '') {
          if (entry.weight === '') {
            let isMissingItem = items.find(
              ({ item_id }) => item_id === Number(entry.item)
            );
            err.push(`${isMissingItem.name} is missing a weight`);
            setIsValid(false);
          }
        }
        if (entry.weight !== '') {
          if (entry.item === '') {
            err.push(`Which item weighs ${entry.weight} kg?`);
            setIsValid(false);
          }
        }
      }
    }
    await setErrorMsgs(err);
    if (err.length === 0) {
      setIsValid(true);
    }
    return err;
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    let form = document.getElementById('input-form');
    handleValidation().then((err) => {
      console.log(err);
      if (err.length === 0) {
        setIsValid(true);
      }
    });
    console.log('is this valid?', isValid);
    if (!isValid) {
      console.log('Form is missing values; try again');
    } else {
      let formContent = {
        formValues,
        entryWeights,
      };
      console.log(formContent);
      postEntries(formContent).then((res) => {
        console.log(res);
        form.reset();
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="input-form">
        <label>Start date:</label>
        <input
          name="date"
          type="date"
          onChange={(e) => handleFormValues(e)}
        ></input>
        <br />
        <label>Source</label>
        <select name="source" onChange={(e) => handleFormValues(e)}>
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
            <select name="item" onChange={(e) => handleChange(index, e)}>
              <option hidden>Select Item</option>
              {items.map((item, key) => (
                <option key={key} value={item.item_id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label>Weight</label>
            <input
              type="text"
              name="weight"
              onChange={(e) => handleChange(index, e)}
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
            <p key={key}>{msg}</p>
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
