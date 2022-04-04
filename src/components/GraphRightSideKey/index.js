import styled from 'styled-components';
import React from 'react';

const Cont = styled.div`
    width: 109px;
    height: 37px;
    margin: 10px;
`;

const Dot = styled.div`
    width: 14px;
    height: 14px;
    background-color: ${props => props.bgColor};
    border-radius: 100px;
`;

const MaterialText = styled.text`
    font-size: 12px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
`;

const GraphRightSideKey = ({
    bgcolor="#70BDBF",
    text="Coffee Cups"
}) => {
    return (
        <Cont >
            <Row>
            <Dot bgColor={bgcolor}/>
            <MaterialText>{text}</MaterialText>
            </Row>
        </Cont>
    );
} 

export default GraphRightSideKey;