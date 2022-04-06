import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react';

import Button from '../Button/index';

import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Delete from '@mui/icons-material/Delete';
import AddCircle from '@mui/icons-material/AddCircle';

const Cont = styled.div`
    background-color: #F9F9F9;
    border: #ACACAC;
    margin: 20px;
    padding: 20px;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid darkgray;
    max-width: 450px;
`;

const Header = styled.text`
    font-size: 15px;
`;

const RowCont = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    gap: 10px 0;
`;

const MarginRight = styled.div`
    width: 35px;
`;

const SubCont = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px 0;
    gap: 5px;
`;

const Dropdown = styled.select`
    width: 125px;
`;
    
const GenericInput = styled.input`
    max-width: 117px;
    min-width: 117px;
`;

const GenericLabel = styled.label`
    font-size: 12px;
`;

const EditEntryPopup = ({}) => {
    return (
        <Cont>
            <RowCont>
                <Header>Edit Entry</Header>
                <IconButton sx={{ "&:hover": { color: "#F86E6E" } }}>
                    <CancelIcon/>
                </IconButton>
            </RowCont>
            <RowCont>
                <SubCont>
                    <GenericLabel for="EditEntrySubAccount">Sub-account</GenericLabel>
                    <Dropdown name="Sub-account" id="EditEntrySubAccount">
                        <option>VIO Coffee Shop</option>
                    </Dropdown>
                </SubCont>
                <SubCont>
                    <GenericLabel for="EditEntryDate">Date</GenericLabel>
                    <GenericInput type="date" name="Date" id="EditEntryDate"/>
                </SubCont>
                <SubCont>
                    <GenericLabel for="EditEntryStatus">Status</GenericLabel>
                    <Dropdown name="Status" id="EditEntryStatus">
                        <option>Pending Pickup</option>
                    </Dropdown>
                </SubCont>
                <MarginRight/>
            </RowCont>
            <RowCont>
                <GenericInput text="" placeholder="Coffee Grinds"/>
                <GenericInput text="" placeholder="100.22 kg"/>
                <Dropdown>
                    <option>N. Van Processor</option>
                </Dropdown>
                <IconButton sx={{ "&:hover": { color: "#F86E6E" } }}>
                    <Delete fontSize="small"/>
                </IconButton>
            </RowCont>
            <RowCont>
                <GenericInput text="" placeholder="Coffee Grinds"/>
                <GenericInput text="" placeholder="100.22 kg"/>
                <Dropdown>
                    <option>N. Van Processor</option>
                </Dropdown>
                <IconButton sx={{ "&:hover": { color: "#F86E6E" } }}>
                    <Delete fontSize="small"/>
                </IconButton>
            </RowCont>
            <IconButton>
                <AddCircle 
                    fontSize="small" 
                    sx={{ "&:hover": { color: "#60C993" } }}
                />
            </IconButton>
                <Button 
                    borderweight="solid 1px darkgray" 
                    textcolor="black"
                    textweight="regular" 
                    buttoncolor="#D2D1D1" 
                    buttontext="Save Edits" 
                    hoverbg="#598B2C"
                />
        </Cont>
    );
} 

export default EditEntryPopup;