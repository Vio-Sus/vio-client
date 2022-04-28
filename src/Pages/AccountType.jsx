import Form from '../components/Account-Type/ChooseAccountType';
import React from 'react';

const AccountTypePage = ({   
  setAddedSomething,
  addedSomething,
  handleFormValues, 
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
          handleFormValues={handleFormValues}                
        ></Form>{' '}
      </div>
    </>
  );
};

export default AccountTypePage;