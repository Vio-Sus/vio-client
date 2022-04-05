import styled from 'styled-components';
import React from 'react';
import GraphRightSideKey from '../GraphRightSideKey';

const Cont = styled.div`
    height:421px;
    width: 177px;
    //fix bg color
    background-color: #F9F9F9;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 13px;
`;

const Header =styled.text`
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 5%;
`;

const Subheaders =styled.text`
    font-size: 12px;
    letter-spacing: 5%;
`;

const SubaccText = styled.text`
    font-size: 10px;
`;

const Cont2 = styled.div`
    display: flex;
    flex-direction:column;
    margin-top: 10px;
`;

const Cont2_1 = styled.text`
    margin-left:25px;
`;

const Cont3 = styled.div`
    display: flex;
    flex-direction:column;
    margin-top: 10px;
`;

const Cont3_1 = styled.text`
    display: flex;
    flex-direction:row;
`;

const GraphLeftSideFilter = ({
    text="Vio Coffee Shop"
}) => {
    return (
        <Cont >
            <Header>Filter</Header>

            <Cont2>
                <Subheaders>Subaccounts</Subheaders>

                <Cont2_1>
                    <SubaccText>{text}</SubaccText>
                </Cont2_1>
            </Cont2>

            <Cont3>
            <Subheaders>Materials</Subheaders>

             <Cont3_1>
                <GraphRightSideKey/>
                <img src="/public/ExitIcon.png"/>
             </Cont3_1>
            </Cont3>
        </Cont>
    );
} 

export default GraphLeftSideFilter;