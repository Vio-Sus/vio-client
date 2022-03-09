import { useState, useEffect } from "react";
import styled from "styled-components";

const Cont = styled.div`
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
        <DropHeaderCont>
            Source
        </DropHeaderCont>
        <DropDownBox
        name="source"
        >
        <option value="vioCoffee">Vio Coffee Shop</option>
        <option value="minTech">Mins Tech</option>
        <option value="brickOff">Brick it OFF</option>
        </DropDownBox>
    </Cont>
  );
}
