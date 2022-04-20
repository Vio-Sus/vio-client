import Form from '../components/Entry/AddEntryForm';
import React from 'react';

const NewEntryPage = ({ sources, items }) => {
  return (
    <>
      <div class="pageCont">
        <header>
          <h1>Input A New Entry</h1>
        </header>
        <Form sources={sources} items={items}></Form>
      </div>
    </>
  );
};

export default NewEntryPage;
