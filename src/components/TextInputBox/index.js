import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react';

const Cont = styled.div`
    display:flex;
    width: ${props => props.width};
    height:${props => props.height};
    border-radius: 7px;
    flex-direction: column;
    font-size: 10px;

    margin-top:20px;
`;

const Text= styled.text`
 font-size: 10px;
`;

const TextInputBox = ({
    buttonwidth = '10.03',
    buttonheight=  '70',
    text = "Source Address",
    defaultvalue = "",
}) => {
    return (
        <Cont >
            
            <label for="sxaddress">{text}</label>
            <input 
            width={buttonwidth} 
            height={buttonheight} 
            type="text" 
            id="sxaddress" 
            name="sxaddress"
            value={defaultvalue}></input>
            
        </Cont>
    );
} 

export default TextInputBox;