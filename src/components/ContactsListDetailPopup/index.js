import styled from 'styled-components';
import React from 'react';

import Button from '../Button/index'
import EditForm from '../Entry/EditEntryForm';

const Cont = styled.div`
    width:372px;
    height:243px;
    background-color: #F9F9F9;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    margin: 10px;
    border: 1px solid darkgray;
    padding:15px;
    box-shadow: 5px 8px 7px #B1B1B1;
`;


const Header= styled.text`
 font-size: 18px;
 display: flex;
 justify-content: center;
 align-items: center;
 text-align: center;
`;

const SubAccName = styled.text`
font-size: 20px;
 display: flex;
 justify-content: center;
 align-items: center;
 text-align: center;
 font-weight:medium;
`;


const InfoCont = styled.text`
color: black;
display: flex;
justify-content: center;
flex-direction: row;
font-size: 14px;
font-weight: 7px;
padding: 20px;
`;

const Li = styled.text`
display: flex;
padding-bottom: 10px;
color: black;
`;

const LeftList = styled.text`
color: black;
display: flex;
flex-direction: column;
font-size: 14px;
font-weight: bold;
`;

const RightList =styled.text`
color: black;
display: flex;
flex-direction: column;
font-size: 14px;
font-weight: 7px;
padding-left: 20px;
`;

const ExitIcon = styled.image`
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
`;

const ContactsListDetailPopup = ({
   type="Source",
   subAccName="VIO Coffee Shop",
   phonenumber="123-456-7890",
   email= "Coffee cups, Straws",
   address="1234 vio rd, Vancouver, bc",
   notes = "They send us alot of coffee grinds and have rude staff",
}) => {
    return (
        <Cont>
            <ExitIcon>
                <img src="/public/ExitIcon.png"/>
            </ExitIcon>

            <Header>Contact Information for:</Header>
            <SubAccName>{subAccName}</SubAccName>
            
            <InfoCont>
                <LeftList>
                    <Li>Type: </Li>
                    <Li>Phone:</Li>
                    <Li>Email:</Li>
                    <Li>Address:</Li>
                    <Li>Notes:</Li>
                </LeftList>

                <RightList>
                    <Li>{type}</Li>
                    <Li>{phonenumber}</Li>
                    <Li>{email}</Li>
                    <Li>{address}</Li>
                    <Li>{notes}</Li>
                </RightList>
            </InfoCont>

            
        </Cont>
    );
} 

export default ContactsListDetailPopup;