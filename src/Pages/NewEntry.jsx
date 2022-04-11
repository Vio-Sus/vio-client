import Form from "../components/Entry/AddEntryForm";
import React from 'react';
import styled from "styled-components";


const MainCont= styled.div`
display: flex;
justify-content: space-between;
margin:10%;
background-color: blue;
`;

const Heading = styled.text`
display: flex;
  font-size: 18px;
  margin-bottom: 5%;
`;

const LeftCont = styled.div`
  margin: 10px;
  width: 50%;
  background-color: aliceblue;
`;

const RightCont = styled.div`
  width: 382px;
  height: 606px;
  border-radius: 10px;
  background-color: #E9E9E9;
  text-align: center;
`;

const NewEntryPage = ({ sources, items }) => {
  return (
    <>
    

    <MainCont>
      <LeftCont>
        <Heading>Input New Entry</Heading>
        <Form sources={sources} items={items}></Form>
      </LeftCont>

      <RightCont>More info here</RightCont>

    </MainCont>
    </>
  );
};

export default NewEntryPage;
