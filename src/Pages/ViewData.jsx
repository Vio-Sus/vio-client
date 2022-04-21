import { useEffect, useState } from 'react';
import { dateToYMD } from '../common/date';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import EntriesList from '../components/Entry/EntriesList';
import EditForm from '../components/Entry/EditEntryForm';
import DeleteConfirmation from '../components/Entry/DeleteEntryConfirmation';
// import Summary from '../components/Summary/Summary';
import Button from '../components/Button';

const StyledLink = styled(Link)`
  color: none;
  text-decoration: none;
  position: relative;
`;

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
  const todayMinus100 = new Date(new Date().setDate(todayObj.getDate() - 60));
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

  const handlePrint = () => {
    window.print();
  };

  return (
    startDate &&
    endDate && (
      <>
        <div class="pageCont">
          <header>
            <div class="headingCont">
              <h1>Your Entries</h1>
              <h3>Here’s an overview of the performance.</h3>
            </div>
            <div class="buttonCont">
              <StyledLink to="/viewGraph">
                <Button buttontext="Graph View" buttoncolor="#4A4A4A" />
              </StyledLink>

              <Button
                buttontext="Export"
                buttoncolor="#4A4A4A"
                onClick={handlePrint}
              />

              <StyledLink to="/NewEntry">
                <Button buttontext="New Entry" />
              </StyledLink>
            </div>
          </header>
          <div class="pageCont">
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
          </div>
          {/* <Summary startDate={startDate} endDate={endDate} />
        <Summary startDate={'2022-01-01'} endDate={'2022-03-10'} /> */}
        </div>
      </>
    )
  );
};

export default ViewDataPage;
