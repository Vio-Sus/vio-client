import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react';


const Cont = styled.div`
    width:${props => props.width};
    height:${props => props.height};
    background-color: ${props => props.bgColor};
    border-radius: 7px;
    border:${props => props.border};
    display: flex;
    align-items:center;
    justify-content: center;

`;

const ButtonText = styled.text`
 color: ${props => props.color};
 font-size:${props => props.fontSize};
 font-weight: ${props => props.fontWeight};
`;

const Button = ({
    buttonwidth = '135px',
    buttonheight=  '40px',
    buttontext ="Input New Data",
    buttoncolor = "#80CF76",
    fontsize = "13px",
    textcolor="white",
    textweight="bold",
    borderweight="none",

    
}) => {
    return (
        <Cont border={borderweight} bgColor={buttoncolor} width={buttonwidth} height={buttonheight}>
            <ButtonText fontWeight={textweight} color={textcolor} fontSize={fontsize}>{buttontext}</ButtonText>
        </Cont>
    );
} 

export default Button;