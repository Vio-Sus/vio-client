import { useEffect, useState } from 'react';
import { getSources } from '../network';

export default function Form() {
  const [sources, setSources] = useState([]);
  useEffect(() => {
    getSources().then((result) => {
      console.log(result);
      setSources(result.data);
    });
    // setSources();
  }, []);

  const [itemWeights, setItemWeights] = useState([{ item: '', weight: '' }]);

  const [formValues, setFormValues] = useState({ date: '', source: '' });

  let handleChange = (i, e) => {
    let newItemWeights = [...itemWeights];
    newItemWeights[i][e.target.name] = e.target.value;
    setItemWeights(newItemWeights);
  };

  let handleFormValues = (e) => {
    // copying the original state
    let newFormValues = formValues;
    // adding onto the copy
    newFormValues[e.target.name] = e.target.value;
    console.log('handling form changes', newFormValues);
    // setting the state from the original to the new copy
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setItemWeights([...itemWeights, { item: '', weight: '' }]);
  };

  let removeFormFields = (i) => {
    let newItemWeights = [...itemWeights];
    newItemWeights.splice(i, 1);
    setItemWeights(newItemWeights);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formValues));
    console.log(JSON.stringify(itemWeights));
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
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
            <option key={key}>{source.name}</option>
          ))}
        </select>
        <br />
        <br />
        {itemWeights.map((element, index) => (
          <div className="form-inline" key={index}>
            <label>Item</label>
            <select name="item" onChange={(e) => handleChange(index, e)}>
              <option hidden>Select Item</option>
              <option>Item 1</option>
              <option>Item 2</option>
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
