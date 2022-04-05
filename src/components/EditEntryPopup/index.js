
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react';

import Button from '../Button/index';
import DropDownOptions from '../DropDownOptions';
import TextInputBox from '../TextInputBox';

const Cont = styled.div`
    max-width : 400px;
    min-height : 200px;
    background-color: #F9F9F9;
    border: #ACACAC;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    margin: 20px;
    padding: 10px;
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

const RowCont = styled.div`
    display:flex;
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

const EditEntryPopup = ({
   date="03/05/2022",
   source="VIO Coffee Shop",
   materials= "Coffee cups, Straws",
   processor = "processor A"
}) => {
    return (
        <Cont>
            <Header>Edit Entry</Header>
            <RowCont>
                <DropDownOptions/>
                <DropDownOptions/>
                <DropDownOptions/>
            </RowCont>
            <RowCont>
                <TextInputBox text="" defaultvalue="Coffee Grinds"/>
                <TextInputBox text="" defaultvalue="100.22 kg"/>
                <DropDownOptions/>
                
            </RowCont>
            <RowCont>
                <TextInputBox text="" defaultvalue="Coffee Grinds"/>
                <TextInputBox text="" defaultvalue="100.22 kg"/>
                <DropDownOptions/>
            </RowCont>
            <Buttons>
                <Button borderweight="solid 1px darkgray" textweight="regular" buttoncolor="#D2D1D1" textcolor="black" buttontext="Save Edits"/>
            </Buttons>
        </Cont>
    );
} 

export default EditEntryPopup;