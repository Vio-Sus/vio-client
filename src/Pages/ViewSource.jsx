import { useState } from 'react';
import React from 'react'
import styled from "styled-components";
import SourcesList from '../components/Source/SourcesList';
import EditSourceForm from '../components/Source/EditSourceForm';
// import AddSourceForm from '../components/Source/AddSourceForm';
import AddSourceModal from '../components/Source/AddSourceModal';

import ContactInputHeadings from '../components/ContactInputHeadings';
import ContactInputData from '../components/ContactInputData';
import Materialtest from '../components/Materialtest';
import Button from '../components/Button';
import BotListNav from '../components/BotListNav';
import Footer from '../components/Footer';


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

      <Top>
        <HeadingWrap>
          <Heading>View Sources</Heading>
          <Subheading>Here’s an overview of the performance.</Subheading>
        </HeadingWrap>

        <ButtonWrap>
          <Button buttoncolor = "#4A4A4A" buttontext="EXPORT" fontsize="12px" buttonwidth='126px' buttonheight='40px'></Button>
          <AddSourceButton onClick={addSource} src="PlusIcon.svg">Add New Source</AddSourceButton>
        </ButtonWrap>
        </Top>

        <DropDownWrap>
        <Materialtest></Materialtest>
        <ClearWrap>
        <Button buttoncolor = "#FFFFFF" textcolor="000000"buttontext="Clear" fontsize="12px" buttonwidth='135px' buttonheight='36px' borderweight="1px solid grey" ></Button>
       </ClearWrap>
        </DropDownWrap>
        
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

        <BotNavWrap>
      <BotListNav></BotListNav>
      </BotNavWrap>

      <Footer></Footer>
    </>
  );
};

export default ViewSourcePage;

//styled components 

const AddSourceButton = styled.div`
background-color: #80CF76;
font-size: 12px;
width: 135px;
height:40px;
border-radius:7px;
display:flex;
align-items:center;
justify-content: center;
color: white;
font-weight:bold;
`

const SourceListCont = styled.div`
display:flex;
flex-direction:column;
align-items:center;
`

const Top = styled.div`
  display:flex;
  margin-top:45px;
  margin-left: 233px;
  margin-right:233px;
`

const HeadingWrap = styled.div`
  display:flex;
  flex-direction:column;
`

const Heading = styled.text`
  font-size:24px;
  font-weight:400;
  color:black;
`;

const Subheading = styled.text`
  font-size:12px;
  font-weight:400
  line-height:14px;
  color: #888888;
`
const ButtonWrap = styled.div`
  justify-content: left;
  justify-content:space-around;
  display:flex;
  width:300px;
  position: relative;
  left:47%;
`

const DropDownWrap = styled.div`
margin-left: 225px;
  margin-top:22px;
  width:300px;
  display:flex;
`
const ContactHeadingWrap = styled.div`
  margin-top:15px;
  margin-bottom:15px;
`
const ClearWrap = styled.div`
margin-top:8px;
margin-left:12px;
`

const Mid = styled.div`
display:flex;
flex-direction:column;
align-items:center;
`

const BotNavWrap = styled.div`
//position:sticky;
display:flex;
margin-top:400px;
margin-bottom:100px;
align-items:center;
`