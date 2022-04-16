import { useState } from 'react';
import React from 'react'
import styled from "styled-components";
import SourcesList from '../components/Source/SourcesList';
import EditSourceForm from '../components/Source/EditSourceForm';
// import AddSourceForm from '../components/Source/AddSourceForm';
import AddSourceModal from '../components/Source/AddSourceModal';

import Button from '../components/Button';
// import Materialtest from '../components/Materialtest';
// import BotListNav from '../components/BotListNav';
// import Footer from '../components/Footer';


const ViewSourcePage = ({ sources, items }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);

  const selectSource = (source) => {
    console.log('Source selected: ', source);
    setSelectedSource(source);
    setIsEditing(true);
    setIsAddingSource(false);
    return;
  };

  const addSource = () => {
    setIsAddingSource(true);
    setIsEditing(false);
  };

  return (
    <>
      <Page>
      <Top>
        <HeadingWrap>
          <Header>Sub Accounts</Header>
          <Subheader>Account and contact information.</Subheader>
        </HeadingWrap>

        <ButtonWrap>
          <EachButtonCont>
          <Button buttoncolor = "#4A4A4A" buttontext="Export" ></Button>
          </EachButtonCont>
          <EachButtonCont>
          <Button buttontext='New Source' onClick={addSource} src="PlusIcon.svg">Add New Source</Button>
          </EachButtonCont>
        </ButtonWrap>
        </Top>
        <Spacer/>
        {/* <DropDownWrap>
        <Materialtest></Materialtest> */}
        {/* <ClearWrap>
        <Button buttoncolor = "#FFFFFF" textcolor="000000"buttontext="Clear" fontsize="12px" buttonwidth='135px' buttonheight='36px' borderweight="1px solid grey" ></Button>
       </ClearWrap> */}
        {/* </DropDownWrap> */}
        
       <Mid>
       <SourceListCont>
      <SourcesList selectSource={selectSource}></SourcesList>
      {isEditing && (
        <EditSourceForm
          source={selectedSource}
          setIsEditing={setIsEditing}
          setIsAddingSource={setIsAddingSource}
        />
      )}
      {isAddingSource && (
        <AddSourceModal setIsAddingSource={setIsAddingSource} />
      )} 
      </SourceListCont>
      </Mid> 

        {/* <BotNavWrap>
      <BotListNav></BotListNav>
      </BotNavWrap> */}

      {/* <Footer></Footer> */}
      </Page>
    </>
  );
};

export default ViewSourcePage;

//styled components 


const Spacer = styled.div`
  display: flex;
  height: 8%;
`;

const SourceListCont = styled.div`
display:flex;
flex-direction:column;
align-items:center;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Top = styled.div`
  margin-top: 7vh;
  display:flex;
  flex-direction: row ;
  justify-content: space-between;
  width: 80vw;
`
const Header = styled.text`
  font-size: 36px;
  font-weight: 300;
  color: black;
`;

const Subheader = styled.text`
  font-size: 18px;
  font-weight: 400;
  color: #888888;
`;

const HeadingWrap = styled.div`
  display:flex;
  flex-direction:column;
`;

const ButtonWrap = styled.div`
  justify-content:space-evenly;
  display: flex;
  flex-direction: row;
`;

const EachButtonCont = styled.div`
  margin: .3rem;
`;

// const ContactHeadingWrap = styled.div`
//   margin-top:15px;
//   margin-bottom:15px;
// `
// const ClearWrap = styled.div`
// margin-top:8px;
// margin-left:12px;
// `

const Mid = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
`;


