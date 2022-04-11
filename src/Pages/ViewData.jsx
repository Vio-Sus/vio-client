import EntriesList from '../components/Entry/EntriesList';
import DeleteConfirmation from '../components/Entry/DeleteEntryConfirmation';
import EditForm from '../components/Entry/EditEntryForm';
import { useEffect, useState } from 'react';
import Summary from '../components/Summary/Summary';
import { dateToYMD } from '../common/date';
import styled from 'styled-components';


import Button from '../components/Button';
import AllButton from '../components/AllButton';


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
                <EachButtonCont> 
                  <Button 
                    buttontext='Graph View'
                    buttoncolor='#4A4A4A'
                  />
                </EachButtonCont>
                <EachButtonCont> 
                  <Button
                    buttontext='Export'
                    buttoncolor='#4A4A4A'
                  />
                </EachButtonCont>
                <EachButtonCont> 
                  <Button
                    buttontext='Add New Entry'
                  />
                </EachButtonCont>
              </ButtonCont>
      </HeaderCont>

      <Spacer />

        {/* <TextCont>
          <Heading>List View</Heading>
          <SubHead>Here's an overview of the performance</SubHead>
        </TextCont> */}
        <FilterCont>
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
          <AllButtonCont>

          <AllButton/>
          </AllButtonCont>
        </FilterCont>
        {/* <Summary startDate={startDate} endDate={endDate} />
        <Summary startDate={'2022-01-01'} endDate={'2022-03-10'} /> */}
      </Page>
      </>
    )
  );
};

export default ViewDataPage;


// styled components

const Header = styled.text`
  font-size: 36px;
  font-weight: 300;
  color: black; 
`;

const Subheader = styled.text`
  font-size: 18px;
  font-weight: 400;
  color: black; 
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const HeaderCont = styled.div`
  margin-top: 10vh;
  display:flex;
  flex-direction: row ;
  justify-content: space-between;
  width: 80vw;
`;

const HeaderTextcont = styled.div`
  display:flex;
  flex-direction: column ;

`;

const ButtonCont = styled.div`
  display: flex;
  flex-direction: row;
`;

const Spacer = styled.div`
  display: flex;
  height: 10%;
`

const FilterCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
`
const EachButtonCont = styled.div`
  margin: .3rem;
`;

const AllButtonCont = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: -75px;
  width: 150px;
  height: 50px;
`;
