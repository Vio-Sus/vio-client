import { useState } from 'react';
import { postEntries } from '../../common/network';
import { handleValidation } from '../../common/validation';
import AddSourceModal from '../Source/AddSourceModal';
import AddItemModal from '../Item/AddItemModal';
import React from 'react';
import styled from "styled-components";
import Button from '../Button'

const MainCont = styled.div`
  display: flex;
  width: 500px;
  background-color: pink;
`;

const Headings = styled.text`
  font-size:12px;
`;

const SourceCont=styled.div`
  margin-bottom: 5%;
`;

const DateCont=styled.div`
  height: 50px;
  background-color: red;
`;

const ItemCont=styled.div`
 background-color: blue;
`;

const WeightCont=styled.div`
background-color: yellow;
`;

const DateItemWeightCont = styled.div`
  display: flex;
  flex-wrap: none;
  width: 500px;
  background-color: aliceblue;
`;

// here
const Inputs = styled.input`
  width: 152px;
  height: 36px;
  background-color: #fff;
  border:1px solid #CBCBCB;
  border-radius:10px;
  text-align: center;
`;

const Select = styled.select`
  width: 152px;
  height: 38px;
  background-color: #fff;
  border-color: #CBCBCB;
  border-radius:10px;
  text-align: center;
`;

const AddItemButton = styled.button`
  background-color: #e6e3e3;
  border:1px solid #CBCBCB;
  border-radius: 100px;
  
`;

const newEntryWeight = () => ({
  id: Date.now(),
  item_id: '',
  weight: '',
});

export default function Form({ items, sources }) {
  const [entryWeights, setEntryWeights] = useState([newEntryWeight()]);
  const [formValues, setFormValues] = useState({});
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);

  const addSource = () => {
    console.log('adding..........');
    setIsAddingSource(true);
  };

  const addItem = () => {
    setIsAddingItem(true);
  };

  let handleFormValues = (e) => {
    // copying the original state
    let newFormValues = formValues;
    // adding onto the copy
    if (e.target.value === 'add_source') {
      addSource();
    } else if (e.target.name === 'created') {
      newFormValues[e.target.name] = e.target.value;
    } else {
      newFormValues[e.target.name] = Number(e.target.value);
    }
    console.log('handling form changes', newFormValues);
    // setting the state from the original to the new copy
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setEntryWeights([...entryWeights, newEntryWeight()]);
  };

  let removeFormFields = (element) => {
    let newEntryWeights = entryWeights.filter(
      (weight) => weight.id != element.id
    );
    setEntryWeights(newEntryWeights);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    let form = document.getElementById('input-form');
    let errorMsgs = handleValidation(formValues, entryWeights, items); // ['error messages']
    setErrorMsgs(errorMsgs);
    console.log(errorMsgs);
    let isValid = errorMsgs.length === 0;
    console.log('is this valid?', isValid);
    if (!isValid) {
      console.log('Form is missing values; try again');
    } else {
      let formContent = {
        entries: entryWeights.map((e) => ({ ...e, ...formValues })),
      };
      console.log('~~~~~~~~~~~~~~~~~`');
      console.log(formContent);
      const res = await postEntries(formContent);
      console.log(res);
      form.reset();
      window.location.reload();
    }
  };

  //closes modal if you click outside of modal
  const handleCancel = () => {
    setIsAddingSource(false);
    setIsAddingItem(false);
  };

  return (
    <MainCont>
      <div onClick={handleCancel}>
        <form onSubmit={handleSubmit} id="input-form" noValidate>

      <SourceCont>
        <Headings>Source</Headings>
          <br/>
          <Select name="source_id" onChange={(e) => handleFormValues(e)}>
            <option hidden>Select Source</option>
            {sources.map((source, key) => (
              <option key={key} value={source.source_id}>
                {source.name}
              </option>
            ))}
            <option value="add_source">Add Source...</option>
          </Select>
          <br/>
      </SourceCont>


          

      <DateItemWeightCont>
          <DateCont>
            <Headings>Date:</Headings>
            <br/>
            {/* here */}
              <Inputs
                name="created"
                type="date"
                onChange={(e) => handleFormValues(e)}
              />
          </DateCont>

          {entryWeights.map((element, index) => (
            <div className="form-inline" key={element.id}>

              <ItemCont>
              <Headings>Item</Headings>
              <br/>
              <Select
                name="item_id"
                onChange={(e) => {
                  e.target.value === 'add_item'
                    ? addItem()
                    : (element.item_id = Number(e.target.value));
                }}
              >
                <option hidden>Select Item</option>
                {items.map((item) => (
                  <option key={item.item_id} value={item.item_id}>
                    {item.name}
                  </option>
                ))}
                <option value="add_item">Add Item...</option>
              </Select>
              </ItemCont>


          
              
              <WeightCont>
              <Headings>Weight</Headings>
              <br/>
              <Inputs
                type="number"
                name="weight"
                onChange={(e) => {
                  element.weight = Number(e.target.value);
                }}
              />
              </WeightCont>

              {!!index && (
                <button
                  type="button"
                  className="button remove"
                  onClick={() => removeFormFields(element)}
                >
                  -
                </button>
              )}
 
            </div>
            
          ))}
       </DateItemWeightCont>  

          <div className="error-messages">
            {errorMsgs.map((msg, key) => (
              <span key={key}>{msg}</span>
            ))}
          </div>
          
               

          <div className="button-section">
            <AddItemButton
              className="button add"
              type="button"
              onClick={() => addFormFields()}
            >
              +
            </AddItemButton>

            <br />
            <br />

            {/* needs onclick to graphs */}
            <Button 
            className="button submit" 
            type="submit"
            buttoncolor = "#EFEFEF"
            fontsize = "13px"
            textcolor="black"
            textweight="medium"
            buttontext="Save Entry"
            buttonwidth = '126px'
            buttonheight=  '40px'
            />
              
          </div>
        </form>
      </div>
      {isAddingSource && (
        <AddSourceModal setIsAddingSource={setIsAddingSource} />
      )}
      {isAddingItem && <AddItemModal setIsAddingItem={setIsAddingItem} />}
    </MainCont>
  );
}
