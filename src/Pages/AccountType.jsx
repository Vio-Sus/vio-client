import Form from '../components/Account-Type/ChooseAccountType';
import React from 'react';

const AccountTypePage = ({   
  setAddedSomething,
  addedSomething,
}) => {
  return (
    <>
      <div class="pageCont">
        <header>
          <h1>Select An Account Type</h1>
        </header>
        <Form                 
          setAddedSomething={setAddedSomething}
          addedSomething={addedSomething}
        ></Form>{' '}
      </div>
    </>
  );
};

export default AccountTypePage;