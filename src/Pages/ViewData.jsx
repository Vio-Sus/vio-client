import EntriesList from '../components/Entry/EntriesList';
import DeleteConfirmation from '../components/Entry/DeleteEntryConfirmation';
import EditForm from '../components/Entry/EditEntryForm';
import { useEffect, useState } from 'react';
import Summary from '../components/Summary/Summary';
import { dateToYMD } from '../common/date';
import styled from 'styled-components';

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
                <Header>Graph View</Header>
                <Subheader>Here’s an overview of the performance.</Subheader>
        </HeaderTextcont>
              <ButtonCont>
                <EachButtonCont> 
                  <Button/>
                </EachButtonCont>
                <EachButtonCont> 
                  <Button/>
                </EachButtonCont>
                <EachButtonCont> 
                  <Button/>
                </EachButtonCont>
              </ButtonCont>
      </HeaderCont>

        {/* <TextCont>
          <Heading>List View</Heading>
          <SubHead>Here's an overview of the performance</SubHead>
        </TextCont> */}
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
        <Summary startDate={startDate} endDate={endDate} />
        {/* <Summary startDate={'2022-01-01'} endDate={'2022-03-10'} /> */}
      </Page>
      </>
    )
  );
};

export default ViewDataPage;


// styled components

const Heading = styled.text`
  font-size: 36px;
  font-weight: 300;
  color: black; 
`;

const SubHead = styled.text`
  font-size: 18px;
  font-weight: 500;
  color: black; 
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 80vw;
  height: 100vh;
  justify content-
  background-color:blue;
`

const HeadCont = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  background-color:blue;
`
const TextCont = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  background-color:green;
`
const HeaderCont = styled.div`
  display:flex;
  flex-direction: row ;
  justify-content: space-between;
  width: 80vw;
  background-color: red;
`;

const HeaderTextcont = styled.div`
  display:flex;
  flex-direction: column ;

`;

const ButtonCont = styled.div`
  background-color: green ;
  display:flex;
  flex-direction: row;
`;
const EachButtonCont = styled.div`
    margin: .3rem;
`;

const Header = styled.text`
  font-size: 24px;
`;
const Subheader = styled.text`
  font-size: 12px;
  color: #888888;
`;