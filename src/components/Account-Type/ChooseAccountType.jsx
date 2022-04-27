import React from 'react';
import styled from 'styled-components';
import Entry from './Entry';
import { useState } from 'react';
import { updateAccountType } from '../../common/network';


const SourceCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const newAccountType = () => ({
    account_type_id: 0
});

export default function Form({    
  setAddedSomething,
  addedSomething,  
}) {

  const [accountType, setAccountType] = useState([newAccountType()]);
  const [formValues, setFormValues] = useState({});
  const [acctId, setacctId] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  

  let handleFormValues = (e) => {   
    let newFormValues = formValues;   
    console.log("GREAT SUCCESS");
    newFormValues[e.target.name] = Number(e.target.value);    
    console.log('Handling form changes',  newFormValues);
    localStorage.setItem("newFormValues", JSON.stringify(newFormValues));  
    setFormValues(newFormValues);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();       
    let formContent = {
    account: formValues
    };
    console.log('~~~~~~~~~~~~~~~~~');
    console.log(formContent);
    const res = await updateAccountType(formContent);   
    console.log(res);
    window.location.reload(false);
  };

  return (
acctId &&
    itemsList && (
    <>    
        <StyledForm onSubmit={handleSubmit} id="input-form1" noValidate>
          <SourceCont>
            <label for="selectSource">Account Type</label>
            <Entry
                objects={acctId}
                entryFor="AccountType"
                handleFormValues={(e) => handleFormValues(e)}
                setAddedSomething={setAddedSomething}
                addedSomething={addedSomething}
              ></Entry>
          </SourceCont>      
          <div>                     
            <div class="buttonCont">           
              <button class="submitButton">Save Account</button>            
            </div>
          </div>
        </StyledForm>         
    </>)
  );
}
