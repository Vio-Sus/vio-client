import styled from 'styled-components';
import React from 'react';

import Button from '../Button/index'
import EditForm from '../Entry/EditEntryForm';

const Cont = styled.div`
    width:372px;
    height:273px;
    background-color: #F9F9F9;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    margin: 10px;
    border: 1px solid darkgray;
    padding: 15px;
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
justify-content: space-evenly;
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
padding-left: 40px;
`;

const Input = styled.div`
display: flex;
padding-bottom: 5px;
`;

const ExitIcon = styled.image`
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const EditContactPopup = ({
   subAccName="VIO Coffee Shop",
}) => {
    return (
        <Cont>
            <ExitIcon>
                <img src="/public/ExitIcon.png"/>
            </ExitIcon>

            <Header>Edit Contact Information for:</Header>
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
                    <Input><input/></Input>
                    <Input><input/></Input>
                    <Input><input/></Input>
                    <Input><input/></Input>
                    <Input><input/></Input>
                </RightList>
            </InfoCont>

            <Buttons>
                <Button 
                buttonwidth="128px" 
                buttonheight="31px" 
                borderweight="solid 1px darkgray" 
                textweight="regular" 
                buttoncolor="#fff" 
                textcolor="red" 
                buttontext="Cancel"
                fontsize="13px"
                />
                
                <Button 
                buttonwidth="128px" 
                buttonheight="31px" 
                borderweight="solid 1px #80CF76" 
                textweight="regular" 
                buttoncolor="#80CF76" 
                textcolor="#fff" 
                buttontext="Save"
                fontsize="13px"
                /> 
            </Buttons>
        </Cont>
    );
} 

export default EditContactPopup;