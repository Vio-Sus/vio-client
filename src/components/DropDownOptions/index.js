import React from "react";
import styled from "styled-components";



const Cont = styled.div`

  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #464646;
`;

const DropHeaderCont = styled.div`
    font-size: 11px;
    padding: 5px;
`;

const DropDownBox = styled.select`
  width: auto;
  height: 28px;
  border: 0.5px solid #cbcbcb;
  color: #464646;
  border-radius: 5px;


  select{
      -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  }
`;

const Select = styled.select`
  height: 30px;
  width: 153px;
  padding: 5px;
  border-radius: 7px;
  border: 0.5px solid #cbcbcb;
  box-shadow: 0px 2px 4px 0px #7474741a;
  cursor: pointer;
  appearance: none;
  &:focus {
    outline: none;
  }
  background-image:
    linear-gradient(45deg, transparent 50%, #80CF76 50%),
    linear-gradient(135deg, #80CF76 50%, transparent 50%),
    radial-gradient(#F1FAF0 70%, transparent 72%);
  background-position:
    129px 13px,
    134px 13px,
    124px 5px;
  background-size:
    5px 5px,
    5px 5px,
    1.5em 1.5em;
  background-repeat: no-repeat;
`;

export default function DropDownOptions({
  text,
  array,
  handleChange
}) {

  return (
    <Cont>
        <form id="make_checkbox_select">
          <div>
            <Label>{text}</Label>
          </div>
          <div>
          <Select name={text} onChange={handleChange} >
            {/* <option hidden>Select...</option> */}
            {array.map((item, key) => (
              <option data-count={key} value={item.name}>{item.name}</option>
            ))}
            </Select>
            </div>

{/* <input type="submit" /> */}

</form>
    </Cont>
  );
}
