import { useState } from 'react';
import SourcesList from '../components/Source/SourcesList';
import EditSourceForm from '../components/Source/EditSourceForm';
// import AddSourceForm from '../components/Source/AddSourceForm';
import AddSourceModal from '../components/Source/AddSourceModal';

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
      <h1>View Sources</h1>
      <button onClick={addSource}>Add New Source</button>
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
    </>
  );
};

export default ViewSourcePage;
