import Form from "../components/Entry/AddEntryForm";
import React from 'react';
import styled from "styled-components";

const Heading = styled.text`
  font-size: 18px;

`;

const NewEntryPage = ({ sources, items }) => {
  return (
    <>
      <Heading>Input New Entry</Heading>
      <Form sources={sources} items={items}></Form>
    </>
  );
};

export default NewEntryPage;
