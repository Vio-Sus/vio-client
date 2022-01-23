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
  return (
    <>
      <form>
        <label>
          {' '}
          Select a Date:
          <SelectDate />
        </label>
        <br />
        <br />
        <label>
          Choose Source:
          <select>
            {sources.map((source, key) => (
              <option key={key}>{source.name}</option>
            ))}
          </select>
        </label>
        <br />
        <br />
        <label>
          Select Item:
          <select>
            <option>Item 1</option>
            <option>Item 2</option>
          </select>
        </label>
        <label>
          Weight:
          <input type="text" />
        </label>
        <br />
        <br />
        <input type="submit" />
      </form>
    </>
  );
}
