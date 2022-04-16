import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react';
import { motion } from "framer-motion";

import Button from '../Button/index'

const Cont = styled.div`
    width: 400px;
    height: 225px;
    background-color: #F9F9F9;
    border: #ACACAC;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    margin: 20px;
    border: 1px solid darkgray;
`;

const DeleteCont = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    height: 25px;
    width: 100%;
`;

const Delete = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-right: 10px;
    margin-top: 10px;
    height: 15px;
    width: 15px;
    border-style: solid;
    border-color: #C4C4C4;
    background-color: #C4C4C4;
    color: white;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 500;

    :hover {
        cursor: pointer;
    }
`;

const Header = styled.text`
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 35px;
    margin-top: 25px;
`;

const Contact = styled.div`
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 35px;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 35px;
`;

export default function DeleteContactPopup({
   name = "VIO Coffee Shop",
   onClickClose = () => {},
   onClickCancel = () => {},
   onClickDelete = () => {},
})
{
    return (
        <Cont>
            <DeleteCont>
                <Delete 
                    onClick={onClickClose} 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    X
                </Delete>
            </DeleteCont>
            <Header>Are you sure you want to delete the contact:</Header>
            <Contact>{name}</Contact>
            <Buttons>
                <Button 
                    borderweight="solid 1px darkgray" 
                    textweight="regular" 
                    buttoncolor="white" 
                    textcolor="#F86E6E" 
                    buttontext="No, Cancel"
                    onClick={onClickCancel}
                />
                <Button 
                    borderweight="solid 1px darkgray" 
                    textweight="regular" 
                    buttoncolor="#F86E6E" 
                    textcolor="white" 
                    buttontext="Delete"
                    onClick={onClickDelete}
                /> 
            </Buttons>
        </Cont>
    );
} 