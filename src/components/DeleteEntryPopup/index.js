import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react';

import Button from '../Button/index'

const Cont = styled.div`
    width:293.06px;
    height:215.07px;
    background-color: #F9F9F9;
    border: #ACACAC;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    margin: 20px;
    border: 1px solid darkgray;
`;

const Header= styled.text`
 font-size: 15px;
 display: flex;
 justify-content: center;
 align-items: center;
text-align: center;
 padding:25px;
`;

const List = styled.text`
color: black;
display: flex;
justify-content: flex-start;
flex-direction: column;
font-size: 12px;
margin-left: 35px;
margin-right: 35px;
`;

const Li = styled.text`
color: black;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 20px;
`;

const DeleteEntryPopup = ({
   date="03/05/2022",
   source="VIO Coffee Shop",
   materials= "Coffee cups, Straws",
   processor = "processor A"
}) => {
    return (
        <Cont>
            <Header>Are you sure you want to delete entry for:</Header>
            <List>
                    <Li>Date: {date}</Li>
                    <Li>Source: {source}</Li>
                    <Li>Materials: {materials}</Li>
                    <Li>Processor: {processor}</Li>
            </List>

            <Buttons>
                <Button borderweight="solid 1px darkgray" textweight="regular" buttoncolor="#D2D1D1" textcolor="black" buttontext="Delete"/>
                <Button borderweight="solid 1px darkgray" textweight="regular" buttoncolor="#F86E6E" textcolor="black" buttontext="No, Cancel"/> 
            </Buttons>
        </Cont>
    );
} 

export default DeleteEntryPopup;