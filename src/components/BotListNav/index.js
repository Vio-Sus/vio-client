import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react';

const Cont = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-evenly;
`;

const ActiveAcc = styled.text`
color: black;
font-size: 10px;
margin-right:600px;
`;


const RowsPerPage = styled.text`
color: black;
font-size: 10px;
`;


const PageNum = styled.text`
color: black;
font-size: 10px;
`;

const Arrows= styled.div`
color: black;
font-size: 10px;
display: flex;
position: relative;
left:40px;
`;

const LeftCont = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const RightCont = styled.div`
    display: flex;
    justify-content: flex-end;
`;


const BotListNav = ({
    AccNum1="456",
    AccNum2="456",
    RowsNum="10",
    PgA="1",
    PgB="1",
}) => {
    return (
        <Cont>
            <LeftCont>
            <ActiveAcc>Active Accounts: {AccNum1}/{AccNum2} </ActiveAcc>
            <RowsPerPage> Rows per page: {RowsNum}</RowsPerPage>
            </LeftCont>

            <RightCont>
            <PageNum> {PgA} of {PgB} &#60; &#62;</PageNum>
            </RightCont>
            
        </Cont>
    );
} 

export default BotListNav;