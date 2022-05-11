import React from 'react';
import styled from 'styled-components';
import Entry from './Entry';
import { useState } from 'react';
import { updateAccountType } from '../../common/network';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const sourceAccount = 1;
  const collectorAccount = 2;

  let handleFormValues = (e) => {   
    let newFormValues = formValues;      
    newFormValues[e.target.name] = Number(e.target.value);       
    localStorage.setItem("newFormValues", JSON.stringify(newFormValues));  
    setFormValues(newFormValues);
    console.log(newFormValues);
  };

  let handleSubmit = async (event) => {    
    event.preventDefault();       
    let formContent = {
    account: formValues
    };
    let accountValue = (Object.values(formContent.account)[0]);   
    const res = await updateAccountType(formContent);   
    console.log(res);   
    if((accountValue) === sourceAccount) {    
      navigate('/newEntry');
      window.location.reload(false);
     
    } else if((accountValue) === collectorAccount) {      
      navigate('/collection-summaries');
      window.location.reload(false);
    }
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
