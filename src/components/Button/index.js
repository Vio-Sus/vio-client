import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react';
import { motion } from "framer-motion";


const Cont = styled(motion.div)`
    width:${props => props.width};
    height:${props => props.height};
    background-color: ${props => props.bgColor};
    border-radius: 7px;
    border:${props => props.border};
    display: flex;
    align-items:center;
    justify-content: center;

    :hover {
        cursor: pointer;
    }

`;

const ButtonText = styled.text`
    color: ${props => props.color};
    font-size:${props => props.fontSize};
    font-weight: ${props => props.fontWeight};
`;

export default function Button({
    buttonwidth = '100px',
    buttonheight=  '30px',
    buttontext ="Input New Data",
    buttoncolor = "#80CF76",
    fontsize = "12px",
    textcolor="white",
    textweight="bold",
    borderweight="none",
    onClick=()=>{},
})
{
    return (
        <Cont 
            border={borderweight} 
            bgColor={buttoncolor} 
            width={buttonwidth} 
            height={buttonheight}
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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