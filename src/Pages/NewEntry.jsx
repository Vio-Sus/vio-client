import Form from '../components/Entry/AddEntryForm';
import React from 'react';

const NewEntryPage = ({
  sources,
  items,
  setAddedSomething,
  addedSomething,
}) => {
  return (
    <>
      <div class="pageCont">
        <header>
          <h1>Input A New Entry</h1>
        </header>
        <Form
          sources={sources}
          items={items}
          setAddedSomething={setAddedSomething}
          addedSomething={addedSomething}
        ></Form>{' '}
      </div>
    </>
  );
};

export default NewEntryPage;
