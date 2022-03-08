import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react';

const Cont = styled.div`
    width:${props => props.width};
    height:${props => props.height};
    background-color: ${props => props.bgColor};
    border-radius: 7px;
    display: flex;
    align-items:center;
    justify-content: center;

`;

const Text= styled.text`
 font-size: 10px;
`;

const TextInputBox = ({
    buttonwidth = '150.03px',
    buttonheight=  '73.23px',
    text= "Source Address",

}) => {
    return (
        <Cont width={buttonwidth} height={buttonheight}>
            <Text>
            <label for="sxaddress">{text}</label>
            <input type="text" id="fname" name="fname"></input>
            </Text>
        </Cont>
    );
} 

export default TextInputBox;