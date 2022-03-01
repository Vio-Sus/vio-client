import { useState } from 'react';
import SourcesList from '../components/Source/SourcesList';
import EditSourceForm from '../components/Source/EditSourceForm';
import AddSourceForm from '../components/Source/AddSourceForm';

const ViewSourcePage = ({ sources, items }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);

  const selectSource = (source) => {
    console.log('Source selected: ', source);
    setSelectedSource(source);
    setIsEditing(true);
    setIsAdding(false);
    return;
  };

  const addSource = () => {
    setIsAdding(true);
    setIsEditing(false);
  };

  return (
    <>
      <h1>View Sources</h1>
      <button onClick={addSource}>Add New Source</button>
      <SourcesList selectSource={selectSource}></SourcesList>
      {isEditing && (
        <EditSourceForm
          source={selectedSource}
          setIsEditing={setIsEditing}
          setIsAdding={setIsAdding}
        />
      )}
      {isAdding && <AddSourceForm setIsAdding={setIsAdding} />}
    </>
  );
};

export default ViewSourcePage;
