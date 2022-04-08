import React from "react";
import styled from "styled-components";



const Cont = styled.div`
  width: 250px;
`

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
export default function DropDownOptions({}) {
  return (
    <Cont>
        <form id="make_checkbox_select">

            <select name="sources">
                <option data-count="1" value="Min's Tech">Min's Tech</option>
                <option data-count="2" value="Vio Coffee">Vio Coffee</option>
                <option data-count="3" value="Brick it OFF">Brick it off</option>
                <option data-count="4" value="Textile">Textile Refresh</option>


            </select>

{/* <input type="submit" /> */}

</form>
    </Cont>
  );
}