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

const ButtonText = styled.text`
 color: white;
 font-size:${props => props.fontSize};
 font-weight: bold;
`;

const Button = ({
    buttonwidth = '99.26px',
    buttonheight=  '31.51px',
    buttontext ="Input New Data",
    buttoncolor = "#80CF76",
    fontsize = "10px",
}) => {
    return (
        <Cont bgColor={buttoncolor} width={buttonwidth} height={buttonheight}>
            <ButtonText fontSize={fontsize}>{buttontext}</ButtonText>
        </Cont>
    );
} 

export default Button;