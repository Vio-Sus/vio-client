import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react';

const Cont = styled.div`
width: 100%;
background-color:lightgray;
display: flex;
flex-direction: row;
justify-content: space-evenly;
`;

const ActiveAcc = styled.text`
color: black;
font-size: 10px;
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
`;

const ArrowLeft = styled.text``;

const ArrowRight = styled.text``;

const BotListNav = ({
    AccNum="456",
    RowsNum="10",
    PgA="1",
    PgB="1",
}) => {
    return (
        <Cont>
            <ActiveAcc>Active Accounts: {AccNum} </ActiveAcc>

            <RowsPerPage> Rows per page:{RowsNum}</RowsPerPage>

            
            <PageNum> {PgA} of {PgB} </PageNum>

            <Arrows>
                <ArrowLeft> &#60; </ArrowLeft>
                <ArrowRight> &#62; </ArrowRight>
            </Arrows>
            
        </Cont>
    );
} 

export default BotListNav;
