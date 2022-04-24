import styled from 'styled-components';
import { useState, useEffect } from 'react';

export default function Entry({
    objects,  
    handleFormValues,
    addedSomething,
}) {
  const Select = styled.select`
    width: 152px;
    height: 38px;
    background-color: #fff;
    border-color: #cbcbcb;
    border-radius: 10px;
    text-align: left;
    height: 36px;
    padding: 5px;
    border-radius: 7px;
    border: 0.5px solid #cbcbcb;
    box-shadow: 0px 2px 4px 0px #7474741a;
    cursor: pointer;
    appearance: none;
    &:focus {
      outline: none;
    }
    background-image: linear-gradient(45deg, transparent 50%, #80cf76 50%),
      linear-gradient(135deg, #80cf76 50%, transparent 50%),
      radial-gradient(#f1faf0 70%, transparent 72%);
    background-position: 119px 16px, 124px 16px, 114px 8px;
    background-size: 5px 5px, 5px 5px, 1.5em 1.5em;
    background-repeat: no-repeat;
  `;

  const [dropdownObjects, setDropdownObjects] = useState(objects);
 
  useEffect(() => {
    setDropdownObjects(dropdownObjects);
    console.log(dropdownObjects)
  }, [dropdownObjects, objects, addedSomething]);

  return (
    dropdownObjects && (
      <>
        <Select name="account_type_id" onChange={handleFormValues}>
          <option hidden>Select Type</option>       
          <option value={1}>1 - Source</option>
          <option value={2}>2 - Collector</option>
          <option value={3}>3 - Processor</option>      
        </Select>
      </>
    )
  );
}
