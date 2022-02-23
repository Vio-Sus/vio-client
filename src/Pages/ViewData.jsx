import EntriesList from "../components/EntriesList";
import DeleteConfirmation from "../components/DeleteConfirmation";
import EditForm from "../components/EditForm";
import { useState } from "react";

const ViewDataPage = ({ sources, items } ) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
      <EntriesList selectEntry={selectEntry}></EntriesList>
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
    </>
  );
};

export default ViewDataPage;
