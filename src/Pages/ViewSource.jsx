import { useState } from 'react';
import React from 'react';
import SourcesList from '../components/Source/SourcesList';
import EditSourceForm from '../components/Source/EditSourceForm';
// import AddSourceForm from '../components/Source/AddSourceForm';
import AddSourceModal from '../components/Source/AddSourceModal';
import Button from '../components/Button';
// import BotListNav from '../components/BotListNav';
import Footer from '../components/Footer';

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="pageCont">
        <header>
          <div class="headingCont">
            <h1>Sources</h1>
            <h3>Account and contact information.</h3>
          </div>
          <div className="buttonCont">
            <Button
              buttoncolor="#4A4A4A"
              buttontext="Print"
              onClick={handlePrint}
            ></Button>
            <Button
              buttontext="New Source"
              onClick={addSource}
              src="PlusIcon.svg"
            />
          </div>
        </header>
        <div className="pageCont">
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
        </div>
        {/* <BotListNav /> */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default ViewSourcePage;
