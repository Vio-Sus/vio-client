import Form from '../components/Entry/AddEntryForm';
import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const MainCont= styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 7vh;
  width: 80vw;
  // background-color: blue;
`;

const Heading = styled.text`
  isplay: flex;
  font-size: 18px;
  margin-bottom: 5%;
`;

const Spacer = styled.div`
  display: flex;
  height: 8%;
`;

const Header = styled.text`
  font-size: 36px;
  font-weight: 300;
  color: black;
`;
const LeftCont = styled.div`
  margin: 10px;
  width: 50%;
<<<<<<< HEAD
  // background-color: aliceblue;
=======
>>>>>>> 429469aa830cec0ddbc3931535bc0d503094786c
`;

const RightCont = styled.div`
  width: 382px;
  height: 606px;
  border-radius: 10px;
  background-color: #e9e9e9;
  text-align: center;
<<<<<<< HEAD
  display: flex;
  justify-content: center;
  align-items: center;
=======
  padding: 20px;
>>>>>>> 429469aa830cec0ddbc3931535bc0d503094786c
`;

const NewEntryPage = ({ sources, items }) => {
  return (
    <> 
      <Page>
        <MainCont>
          <LeftCont>
            <Header>Input A New Entry</Header>
              <Spacer/>
            <Form sources={sources} items={items}></Form>
          </LeftCont>
          <RightCont>More Info Here</RightCont>
        </MainCont>
      </Page>
    </>
  );
};

export default NewEntryPage;
