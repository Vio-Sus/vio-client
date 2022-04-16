import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react';
import { motion } from "framer-motion";

import Button from '../Button/index'

const Cont = styled.div`
    width: 450px;
    height: 235px;
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
const Header= styled.text`
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 25px;
`;

const List = styled.text`
    color: black;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 35px;
    margin-right: 35px;
`;

const Li = styled.text`
    color: black;
    font-size:14px;
`;

const Bold = styled.text`
    font-weight: 600;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 20px;
`;

const ButtonCont = styled.div`
  margin: 20px;
  grid-column-start: 1;
  grid-column-end: 3;
  gap: 40px;
  display: flex;
  justify-content: center;
`;

export default function DeleteEntryPopup({
   date = "03/05/2022",
   source = "VIO Coffee Shop",
   materials = "Coffee cups, Straws",
   processor = "processor A",
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
            <Header>Are you sure you want to delete the following entry:</Header>
            <List>
                    <Li><Bold>Date: </Bold>{date}</Li>
                    <Li><Bold>Source: </Bold>{source}</Li>
                    <Li><Bold>Materials: </Bold>{materials}</Li>
                    <Li><Bold>Processor: </Bold>{processor}</Li>
            </List>

            <ButtonCont>
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
            </ButtonCont>
        </Cont>
    );
} 


