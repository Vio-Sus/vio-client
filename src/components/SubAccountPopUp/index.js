import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react';

import Button from '../Button/index'
import DropDownOptions from '../DropDownOptions'
import BasicSelect from '../Materialtest/'

const Cont = styled.div`
    width:491.59px;
    height:auto;
    padding: 0.5rem;
    background-color: #F9F9F9;
    border: #ACACAC;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    margin: 20px;
    border: 1px solid darkgray;
`;

const Header= styled.text`
 font-size: 19px;
 display: flex;
 /* justify-content: center; */
 align-items: center;
text-align: center;
 padding:25px;
`;

const SubHeader = styled.text`
font-size:11px;
text-align: left ;
`;



const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const FirstCont = styled.div`
    display:flex;
    justify-content:center ;
    flex-wrap: wrap;
    width:491.59px;


`;

const InputBox = styled.input`
    height: ${props => props.height};
    width:${props => props.width};
    border: 1px solid darkgray;
    border-radius: 5px ;
    

`;

const InputBoxCont = styled.div`
    display:flex;
    flex-direction: column ;
`;

const SecondCont = styled.div`
    display:flex;
    flex-direction: column ;
    /* align-items:center;  */
    width:391.54px;
`;
const MaterialCont = styled.div`
    display: flex;
    flex-direction: row ;
    height: 80px;

`;


const SubAccountPopUp = ({
  text = "Add",
}) => {
    return (
        <Cont>
            <Header>{text} A Sub-account</Header>
            <FirstCont>
                <InputBoxCont>
                    <SubHeader>Source Name</SubHeader>
                    <InputBox
                    width="193px"
                    height="39px"
                    
                    />
                </InputBoxCont>

                <InputBoxCont>
                    <SubHeader>Source Address</SubHeader>
                    <InputBox
                     width="193px"
                     height="39px"
                    />
                </InputBoxCont>

                <InputBoxCont>
                    <SubHeader>Source Address</SubHeader>
                    <InputBox
                     width="391.54px"
                     height="74.05px"
                    />
                </InputBoxCont>
            <SecondCont>
                <SubHeader>Main Materials</SubHeader>
                <MaterialCont>

                    <BasicSelect/>
                    <BasicSelect/>
                    <BasicSelect/>

                </MaterialCont>

            </SecondCont>
                        
                <Buttons>
                <Button borderweight="solid 1px darkgray" textweight="regular" buttoncolor="#D2D1D1" textcolor="black" buttontext="Add Source"/>
            </Buttons>



            </FirstCont>

  
        </Cont>
    );
} 

export default SubAccountPopUp;