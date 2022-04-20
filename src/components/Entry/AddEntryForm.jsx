import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { postEntries } from '../../common/network';
import { handleValidation } from '../../common/validation';
import { Link } from 'react-router-dom';
import AddSourceModal from '../Source/AddSourceModal';
import AddItemModal from '../Item/AddItemModal';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Delete from '@mui/icons-material/Delete';

const SourceCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3%;
`;

const DateCont = styled.div`
  grid-column: 1;
  grid-row: 1;
`;

const ItemCont = styled.div`
  grid-column: 1;
  grid-row: 1;
`;

const WeightCont = styled.div`
  grid-column: 2;
  grid-row: 1;
`;

const ItemWeightPair = styled.div`
  display: grid;
  gap: 20px;
  margin-bottom: 10px;
  grid-template-columns: 1fr 1fr 30px;
`;

const ItemWeightCont = styled.div`
  display: grid;
  grid-column: 2 / 4;
  grid-row: 1;
`;

const DateItemWeightCont = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto;
  gap: 20px 0;
  max-width: 515px;
`;

const StyledLink = styled(Link)`
  color: none;
  text-decoration: none;
  position: relative;
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
    <>
      <div onClick={handleCancel}>
        <form onSubmit={handleSubmit} id="input-form" noValidate>
          <SourceCont>
            <label for="selectSource">Source</label>
            <select
              name="source_id"
              class="dropdown"
              id="selectSource"
              onChange={(e) => handleFormValues(e)}
            >
              <option hidden>Select Source</option>
              {sources.map((source, key) => (
                <option key={key} value={source.source_id}>
                  {source.name}
                </option>
              ))}
              <option value="add_source">Add Source...</option>
            </select>
          </SourceCont>

          <DateItemWeightCont>
            <DateCont>
              <label for="inputNewDate">Date</label>
              <input
                class="dropdown"
                id="inputNewDate"
                name="created"
                type="date"
                onChange={(e) => handleFormValues(e)}
              />
            </DateCont>
            <ItemWeightCont>
              {entryWeights.map((element, index) => (
                <ItemWeightPair key={element.id}>
                  <ItemCont>
                    <label for="selectNewItem">Item</label>
                    <select
                      class="dropdown"
                      id="selectNewItem"
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
                    </select>
                  </ItemCont>

                  <WeightCont>
                    <label for="inputNewWeight">Weight</label>
                    <div class="weightInputCont">
                      <input
                        class="weightInput"
                        id="inputNewWeight"
                        type="number"
                        name="weight"
                        placeholder="0"
                        min="0"
                        onChange={(e) => {
                          element.weight = Number(e.target.value);
                        }}
                      />
                      <span class="weightSuffix">kg</span>
                    </div>
                  </WeightCont>

                  {!!index && (
                    <IconButton
                      onClick={() => removeFormFields(element)}
                      sx={{ width: 2, marginTop: 3, '&:hover': { backgroundColor: 'transparent', transform: 'scale(1.1)' } }}
                    >
                      <Delete sx={{ '&:hover': { color: '#80cf76' } }} />
                    </IconButton>
                  )}
                </ItemWeightPair>
              ))}
            </ItemWeightCont>
          </DateItemWeightCont>

          <div>
            <div class="buttonCont">
              <IconButton onClick={() => addFormFields()}
              sx={{ '&:hover': { backgroundColor: 'transparent', transform: 'scale(1.1)' } }}
              >
                <AddCircleIcon sx={{ '&:hover': { color: '#80cf76' } }} />
              </IconButton>
            </div>

            <div class="errorMessages">
              {errorMsgs.map((msg, key) => (
                <span key={key}>{msg}</span>
              ))}
            </div>

            <div class="buttonCont">
              {/* uncommenting StyledLink will disable the form's error messages */}
              {/* <StyledLink to="/viewData"> */}
              <button class="submitButton">Save Entry</button>
              {/* </StyledLink> */}
            </div>
          </div>
        </form>
      </div>
      {isAddingSource && (
        <AddSourceModal setIsAddingSource={setIsAddingSource} />
      )}
      {isAddingItem && <AddItemModal setIsAddingItem={setIsAddingItem} />}
    </>
  );
}
