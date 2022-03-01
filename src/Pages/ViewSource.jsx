import { useState } from 'react';
import SourcesList from '../components/Source/SourcesList';
import EditSourceForm from '../components/Source/EditSourceForm';

const ViewSourcePage = ({ sources, items }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);

  const selectSource = (source) => {
    console.log('Source selected: ', source);
    setSelectedSource(source);
    setIsEditing(true);
    return;
  };

  return (
    <>
      <h1>View Sources</h1>
      <a>Add New Source</a>
      <SourcesList selectSource={selectSource}></SourcesList>
      {isEditing && <EditSourceForm source={selectedSource} />}
    </>
  );
};

export default ViewSourcePage;
