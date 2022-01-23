import { useEffect, useState } from 'react';
import { getSources } from '../network';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SelectDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  );
};

export default function Form() {
  const [sources, setSources] = useState([]);
  useEffect(() => {
    getSources().then((result) => {
      console.log(result);
      setSources(result.data);
    });
    // setSources();
  }, []);

  const [formValues, setFormValues] = useState([
    { source: '', item: '', weight: '' },
  ]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { source: '', item: '', weight: '' }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formValues));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Select a Date:
          <SelectDate />
        </label>
        <br />
        <br />
        {formValues.map((element, index) => (
          <div className="form-inline" key={index}>
            <label>Source</label>
            <select
              name="source"
              value={element.source || ''}
              onChange={(e) => handleChange(index, e)}
            >
              <option hidden>Select Source</option>
              {sources.map((source, key) => (
                <option key={key}>{source.name}</option>
              ))}
            </select>
            <label>Item</label>
            <select
              name="item"
              value={element.item || ''}
              onChange={(e) => handleChange(index, e)}
            >
              <option hidden>Select Item</option>
              <option>Item 1</option>
              <option>Item 2</option>
            </select>
            <label>Weight</label>
            <input
              type="text"
              name="weight"
              value={element.weight || ''}
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
