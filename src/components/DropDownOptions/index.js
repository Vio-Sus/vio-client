import React from 'react';

export default function DropDownOptions({ text, array, handleChange }) {
  console.log('arrraaaaayyyy', array);

  return (
    <>
      <form id="make_checkbox_select">
        <div>
          <label>{text}</label>
        </div>
        <div>
          <select name={text} onChange={handleChange}>
            <option hidden>Select...</option>
            {array.map((item, key) => (
              <option data-count={key} value={item.name}>
                {item.name}{' '}
              </option>
            ))}
          </select>
        </div>

        {/* <input type="submit" /> */}
      </form>
    </>
  );
}
