import EntriesList from '../components/Entry/EntriesList';
import DeleteConfirmation from '../components/Entry/DeleteEntryConfirmation';
import EditForm from '../components/Entry/EditEntryForm';
import { useEffect, useState } from 'react';
import Summary from '../components/Summary/Summary';

const ViewDataPage = ({ sources, items }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  console.log(`i am sources from view data ${JSON.stringify({ sources })}`);
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

  return (
    <>
      <h1>View Data</h1>
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
      {/* <Summary startDate={'2022-01-01'} endDate={'2022-03-10'} /> */}
    </>
  );
};

export default ViewDataPage;
