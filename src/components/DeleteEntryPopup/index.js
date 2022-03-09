
import styled from 'styled-components';
import React from 'react';

const Cont = styled.div`
    width:293.06px;
    height:215.07px;
    background-color: lightgray;
    border: #ACACAC;
    border-radius: 7px;

    margin: 20px;
`;

const Header= styled.Text`
 font-size: 15px;
 display: flex;
 justify-content: center;
 align-items: center;
 padding:25px;
`;

const List = styled.Text`
color: black;
display: flex;
justify-content: flex-start;
flex-direction: column;
`;

const Li = styled.Text`
`;

const DeleteEntryPopup = ({
   date="03/05/2022",
   source="source name",
   materials= "material X",
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
        </Cont>
    );
} 

export default DeleteEntryPopup;