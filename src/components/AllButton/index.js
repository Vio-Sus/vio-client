import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react';

const Cont = styled.div`
    width:100px;
    height:25px;
    display: flex;
    align-items:center;
    justify-content: center;
    :hover {
        cursor: pointer;
    }
`;

const ButtonText = styled.text`
    color: ${props => props.color};
    font-size: 12px;
    text-decoration: underline;
`;

export default function AllButton({
    buttontext = "Select All",
    fontsize = "12px",
    textcolor = "black",
    textweight = "bold",
    onClick = () => {},
})
{
    return (
        <Cont
            onClick={onClick}
        >
            <ButtonText 
                fontWeight={textweight} 
                color={textcolor} 
                fontSize={fontsize}
            >
                {buttontext}
            </ButtonText>
        </Cont>
    );
}