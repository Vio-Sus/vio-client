import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react';
import { motion } from "framer-motion";


const Cont = styled(motion.div)`
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
    font-size: 14px;
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