import { useState, useEffect } from 'react';
import { postEntries } from '../../common/network';
import { handleValidation } from '../../common/validation';
import EntryDropdown from './EntryDropdown';
import AddSourceModal from '../Source/AddSourceModal';
import AddItemModal from '../Item/AddItemModal';
import React from 'react';
import styled from 'styled-components';

const MainCont = styled.div`
  display: flex;
  width: 500px;
  background-color: none;
`;

const Headings = styled.text`
  font-size: 12px;
`;

const SourceCont = styled.div`
  margin-bottom: 5%;
  /* background-color: #fad; */
`;

const DateCont = styled.div`
  background-color: none;
  /* background-color: red; */
`;

const ItemCont = styled.div`
  margin-left: 10%;
  //background-color: green;
`;

//issues here
const WeightCont = styled.div`
  margin-left: 10%;
  //background-color: yellow;
`;

const DateItemWeightCont = styled.div`
  display: flex;
  flex-direction: row;
  width: 600px;
  //background-color: pink;
`;

// here
const Inputs = styled.input`
  width: 152px;
  height: 35px;
  background-color: #fff;
  border: 1px solid #cbcbcb;
  border-radius: 7px;
  text-align: center;
`;

const AddItemButton = styled.button`
  display: flex;
  justify-content: center;
  height: 20px;
  width: 20px;
  background-color: #e6e3e3;
  border: 1px solid #cbcbcb;
  border-radius: 120px;
`;

const AddItemButCont = styled.div`
  display: flex;
  justify-content: center;
  width: 125%;
  margin-top: 5%;
`;

const SaveButton = styled.button`
  width: 126px;
  height: 40px;
  background-color: #efefef;
  font-size: 13px;
  color: black;
  border: none;
  border-radius: 10px;
`;

const ButtonCont = styled.div`
  display: flex;
  justify-content: center;
  width: 125%;
  margin-top: -3%;
`;

const ItemWeightCont = styled.div`
  display: flex;
`;

const newEntryWeight = () => ({
  id: Date.now(),
  item_id: '',
  weight: '',
});

export default function Form({
  items,
  sources,
  setAddedSomething,
  addedSomething,
}) {
  const [entryWeights, setEntryWeights] = useState([newEntryWeight()]);
  const [formValues, setFormValues] = useState({});
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [sourcesList, setSourcesList] = useState([]);
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    console.log('this is the add stuff ', sources);
    setSourcesList(sources);
    setItemsList(items);
  }, [items, sources]);

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
      // window.location.reload();
    }
  };

  //closes modal if you click outside of modal
  const handleCancel = () => {
    setIsAddingSource(false);
    setIsAddingItem(false);
  };

  return (
    sourcesList &&
    itemsList && (
      <MainCont>
        <div onClick={handleCancel}>
          <form onSubmit={handleSubmit} id="input-form" noValidate>
            <SourceCont>
              <Headings>Source</Headings>
              <br />
              <EntryDropdown
                objects={sourcesList}
                entryFor="Source"
                handleFormValues={(e) => handleFormValues(e)}
                setAddedSomething={setAddedSomething}
                addedSomething={addedSomething}
              ></EntryDropdown>
              <br />
            </SourceCont>

            <DateItemWeightCont>
              <DateCont>
                <Headings>Date:</Headings>
                <br />
                {/* here */}
                <Inputs
                  name="created"
                  type="date"
                  onChange={(e) => handleFormValues(e)}
                />
              </DateCont>

              {entryWeights.map((element, index) => (
                <div className="form-inline" key={element.id}>
                  <ItemWeightCont>
                    <ItemCont>
                      <Headings>Item</Headings>
                      <br />
                      <EntryDropdown
                        name="item_id"
                        objects={itemsList}
                        entryFor="Item"
                        handleFormValues={(e) => {
                          e.target.value === 'add_item'
                            ? addItem()
                            : (element.item_id = Number(e.target.value));
                        }}
                        setAddedSomething={setAddedSomething}
                        addedSomething={addedSomething}
                      ></EntryDropdown>
                      {/* <Select
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
                      </Select> */}
                    </ItemCont>

                    <WeightCont>
                      <Headings>Weight</Headings>
                      <br />
                      <Inputs
                        type="number"
                        name="weight"
                        onChange={(e) => {
                          element.weight = Number(e.target.value);
                        }}
                      />
                    </WeightCont>
                  </ItemWeightCont>

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
              <AddItemButCont>
                <AddItemButton
                  className="button add"
                  type="button"
                  onClick={() => addFormFields()}
                >
                  +
                </AddItemButton>
              </AddItemButCont>
              <br />
              <br />

              {/* needs onclick to graphs */}
              {/* <Button 
            className="button submit" 
            type="submit"
            buttoncolor = "#EFEFEF"
            fontsize = "13px"
            textcolor="black"
            textweight="medium"
            buttontext="Save Entry"
            buttonwidth = '126px'
            buttonheight=  '40px'
            /> */}
              <ButtonCont>
                <SaveButton className="button submit" type="submit">
                  Save Entry
                </SaveButton>
              </ButtonCont>
            </div>
          </form>
        </div>
        {isAddingSource && (
          <AddSourceModal
            setIsAddingSource={setIsAddingSource}
            setAddedSomething={setAddedSomething}
          />
        )}
        {isAddingItem && (
          <AddItemModal
            setIsAddingItem={setIsAddingItem}
            setAddedSomething={setAddedSomething}
          />
        )}
      </MainCont>
    )
  );
}
