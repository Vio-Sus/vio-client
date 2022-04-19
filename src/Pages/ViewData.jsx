import { useEffect, useState } from 'react';
import { dateToYMD } from '../common/date';
import styled from 'styled-components';
import EntriesList from '../components/Entry/EntriesList';
import DeleteConfirmation from '../components/Entry/DeleteEntryConfirmation';
import EditForm from '../components/Entry/EditEntryForm';
import Button from '../components/Button';
// import Summary from '../components/Summary/Summary';
import { Routes, Route, Link } from "react-router-dom";


const ViewDataPage = ({ sources, items }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  //-------Loading screen-----------

  const selectEntry = (entry, method) => {
    console.log('Entry selected: ', entry);
    setSelectedEntry(entry);
    switch (method) {
      case 'edit':
        setIsDeleting(false);
        setIsEditing(true);
        break;
      case 'delete':
        setIsEditing(false);
        setIsDeleting(true);
        break;
      default:
        return;
    }
  };

  const todayObj = new Date(new Date().toString());
  const todayMinus100 = new Date(new Date().setDate(todayObj.getDate() - 100));
  //set up dates for date input
  const todayDate = dateToYMD(todayObj);
  const defaultStartDate = dateToYMD(todayMinus100);

  useEffect(() => {
    (async () => {
      try {
        await setStartDate(defaultStartDate);
        await setEndDate(todayDate);

        console.log('startDate: ', startDate);
        console.log('endDate: ', endDate);
      } catch {}
    })();
  }, []);

  return (
    startDate &&
    endDate && (
      <>
        <Page>
          <HeaderCont>
            <HeaderTextcont>
              <Header>List View</Header>
              <Subheader>Here’s an overview of the performance.</Subheader>
            </HeaderTextcont>
            <ButtonCont>
            <StyledLink to='/viewGraph'>
              <Button buttontext="Graph View" buttoncolor="#4A4A4A" />
            </StyledLink>
              <Button buttontext="Export" buttoncolor="#4A4A4A" />
              <Button buttontext="Add New Entry" />
            </ButtonCont>
          </HeaderCont>
          <Mid>
            <EntriesList
              selectEntry={selectEntry}
              sources={sources}
              items={items}
            ></EntriesList>
            {isEditing && (
              <EditForm
                entry={selectedEntry}
                setIsEditing={setIsEditing}
                sources={sources}
                items={items}
              />
            )}
            {isDeleting && (
              <DeleteConfirmation
                entry={selectedEntry}
                setIsDeleting={setIsDeleting}
                sources={sources}
                items={items}
              />
            )}
          </Mid>
          {/* <Summary startDate={startDate} endDate={endDate} />
        <Summary startDate={'2022-01-01'} endDate={'2022-03-10'} /> */}
        </Page>
      </>
    )
  );
};

export default ViewDataPage;


// styled components
const Top = styled.div`
  display:flex;
  margin-top: 7vh;
  margin-left: 233px;
  margin-right:233px;
`;

const StyledLink = styled(Link)`
  color: none;
  text-decoration: none;
  position: relative;
`;

const Mid = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
`;

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

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const HeaderCont = styled.div`
  display:flex;
  flex-direction: row ;
  justify-content: space-between;
  width: 80vw;
`;

const HeaderTextcont = styled.div`
  display:flex;
  flex-direction: column;
`;

const ButtonCont = styled.div`
  display: flex;
  flex-direction: row;
`;

const Spacer = styled.div`
  display: flex;
  height: 50px;
`;

const EachButtonCont = styled.div`
  margin: .3rem;
`;

