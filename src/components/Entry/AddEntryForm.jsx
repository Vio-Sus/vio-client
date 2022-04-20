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

const WeightSubCont = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  max-width: 140px;
  padding-left: 10px;
  border-radius: 7px;
  border: 0.5px solid #cbcbcb;
  box-shadow: 0px 2px 4px 0px #7474741a;
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

const DateInput = styled.input`
  height: 35px;
  width: 140px;
  padding: 0 5px;
  border-radius: 7px;
  border: 0.5px solid #cbcbcb;
  box-shadow: 0px 2px 4px 0px #7474741a;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &::-webkit-calendar-picker-indicator {
    opacity: 0;
  }
  background-image: linear-gradient(45deg, transparent 50%, #80cf76 50%),
    linear-gradient(135deg, #80cf76 50%, transparent 50%),
    radial-gradient(#f1faf0 70%, transparent 72%);
  background-position: 129px 15px, 134px 15px, 124px 7px;
  background-size: 5px 5px, 5px 5px, 1.5em 1.5em;
  background-repeat: no-repeat;
`;

const Select = styled.select`
  height: 35px;
  width: 150px;
  padding: 5px;
  border-radius: 7px;
  border: 0.5px solid #cbcbcb;
  box-shadow: 0px 2px 4px 0px #7474741a;
  cursor: pointer;
  appearance: none;
  &:focus {
    outline: none;
  }
  background-image: linear-gradient(45deg, transparent 50%, #80cf76 50%),
    linear-gradient(135deg, #80cf76 50%, transparent 50%),
    radial-gradient(#f1faf0 70%, transparent 72%);
  background-position: 129px 13px, 134px 13px, 124px 5px;
  background-size: 5px 5px, 5px 5px, 1.5em 1.5em;
  background-repeat: no-repeat;
`;

const WeightInput = styled.input`
  max-width: 100px;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const Suffix = styled.div`
  position: relative;
  color: #464646;
  padding: 15px 15px 15px 0;
`;

const SaveButton = styled.button`
  width: 100px;
  height: 30px;
  margin: 6em;
  background-color: #80cf76;
  font-size: 12px;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 4px 0px #7474741a;
  :hover {
    cursor: pointer;
  }
`;

const ButtonCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
            <h4>Source</h4>
            <Select name="source_id" onChange={(e) => handleFormValues(e)}>
              <option hidden>Select Source</option>
              {sources.map((source, key) => (
                <option key={key} value={source.source_id}>
                  {source.name}
                </option>
              ))}
              <option value="add_source">Add Source...</option>
            </Select>
          </SourceCont>

          <DateItemWeightCont>
            <DateCont>
              <h4>Date</h4>
              <DateInput
                name="created"
                type="date"
                onChange={(e) => handleFormValues(e)}
              />
            </DateCont>
            <ItemWeightCont>
              {entryWeights.map((element, index) => (
                <ItemWeightPair className="form-inline" key={element.id}>
                  <ItemCont>
                    <h4>Item</h4>
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
                    <h4>Weight</h4>
                    <WeightSubCont>
                      <WeightInput
                        type="number"
                        name="weight"
                        placeholder="0"
                        onChange={(e) => {
                          element.weight = Number(e.target.value);
                        }}
                      />
                      <Suffix>kg</Suffix>
                    </WeightSubCont>
                  </WeightCont>

                  {!!index && (
                    <IconButton
                      onClick={() => removeFormFields(element)}
                      sx={{ marginTop: 2 }}
                    >
                      <Delete sx={{ '&:hover': { color: '#80cf76' } }} />
                    </IconButton>
                  )}
                </ItemWeightPair>
              ))}
            </ItemWeightCont>
          </DateItemWeightCont>

          <div className="button-section">
            <ButtonCont>
              <IconButton onClick={() => addFormFields()}>
                <AddCircleIcon sx={{ '&:hover': { color: '#80cf76' } }} />
              </IconButton>
            </ButtonCont>

            <div className="error-messages">
              {errorMsgs.map((msg, key) => (
                <span key={key}>{msg}</span>
              ))}
            </div>

            <ButtonCont>
              {/* uncommenting StyledLink will disable the error messages */}
              {/* <StyledLink to="/viewData"> */}
              <SaveButton buttontext="Save Entry" className="button submit">
                Save Entry
              </SaveButton>
              {/* </StyledLink> */}
            </ButtonCont>
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
