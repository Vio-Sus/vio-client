import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';
import SourcesList from '../components/Source/SourcesList';
import EditSourceForm from '../components/Source/EditSourceForm';
// import AddSourceForm from '../components/Source/AddSourceForm';
import AddSourceModal from '../components/Source/AddSourceModal';

import Button from '../components/Button';
import BotListNav from '../components/BotListNav';
import Footer from '../components/Footer';
import TypeDropDown from '../components/TypeDropDown';

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
    <Page>
      <Top>
        <HeadingWrap>
          <Heading>View Sources</Heading>
          <Subheading>Here’s an overview of the performance.</Subheading>
        </HeadingWrap>

        <ButtonWrap>
          <EachButtonCont>
            <Button buttontext="Export" buttoncolor="#4A4A4A" />
          </EachButtonCont>
          <EachButtonCont>
            <Button buttontext="Add New Entry" onClick={addSource} />
          </EachButtonCont>
        </ButtonWrap>
      </Top>

      <DropdownCont>
        <TypeDropDown text="Type" />
      </DropdownCont>
      {/* <ClearWrap>
        <Button buttoncolor = "#FFFFFF" textcolor="000000"buttontext="Clear" fontsize="12px" buttonwidth='135px' buttonheight='36px' borderweight="1px solid grey" ></Button>
       </ClearWrap> */}

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
      <Space></Space>
      <Footer></Footer>
    </Page>
  );
};

export default ViewSourcePage;

//styled components
const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const AddSourceButton = styled.div`
  background-color: #80cf76;
  font-size: 12px;
  width: 135px;
  height: 40px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
`;

const SourceListCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Top = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
`;

const HeadingWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.text`
  font-size: 24px;
  font-weight: 400;
  color: black;
`;

const Subheading = styled.text`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  color: #888888;
`;

const ButtonWrap = styled.div`
  justify-content: space-evenly;
  display: flex;
  flex-direction: row;
`;

const ClearWrap = styled.div`
  /* margin-top:8px;
  margin-left:12px; */
  justify-content: space-evenly;
  display: flex;
  flex-direction: row;
`;

const EachButtonCont = styled.div`
  margin: 0.3rem;
`;

const DropdownCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 80vw;
`;

const DropCont = styled.div`
  display: flex;
  flex-direction: column;
`;

//dropdown styling
const DateInput = styled.input`
  height: 36px;
  width: 141px;
  //change accordingly
  padding: 0 5px;
  border-radius: 7px;
  border: 0.5px solid #cbcbcb;
  box-shadow: 0px 2px 4px 0px #7474741a;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &::-webkit-calendar-picker-indicator {
    opacity: 0;
  }
  background-image: linear-gradient(45deg, transparent 50%, #80cf76 50%),
    linear-gradient(135deg, #80cf76 50%, transparent 50%),
    radial-gradient(#f1faf0 70%, transparent 72%);
  background-position: 120px 16px, 125px 16px, 115px 8px;
  background-size: 5px 5px, 5px 5px, 1.5em 1.5em;
  background-repeat: no-repeat;
`;

const Mid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Space = styled.div`
  display: flex;
  margin-top: 100px;
`;

const BotNavWrap = styled.div`
  position: absolute;
  margin-top: 770px;
  align-items: center;
`;
