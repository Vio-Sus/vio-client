import React from "react";
import styled from "styled-components";
import {Dropdown, Menu} from 'semantic-ui-react'

const Cont = styled.div`
    width: 110px;
    height: 50px;
    background-color: #fad;

`;

const options = [
  {key: 1, text: 'Choice1', value: 1},
  {key: 2, text: 'Choice2', value: 2},
  {key: 3, text: 'Choice3', value: 3},
  {key: 4, text: 'Choice4', value: 4},

]

const DropdownExampleSimple = () => (
  <Cont>
  <Menu compact>
      <Dropdown 
      text='Dropdown'
      options={options}
      simple item />
    </Menu>
    </Cont>
)

export default DropdownExampleSimple