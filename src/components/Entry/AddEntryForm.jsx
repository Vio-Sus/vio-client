import { useState } from 'react';
import { postEntries } from '../../common/network';
import { handleValidation } from '../../common/validation';
import AddSourceModal from '../Source/AddSourceModal';
import AddItemModal from '../Item/AddItemModal';
import React from 'react';
import styled from "styled-components";
import Button from '../../components/'


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
          <label>Date:</label>
          <input
            name="created"
            type="date"
            onChange={(e) => handleFormValues(e)}
          ></input>
          <br />
          <label>Source</label>
          <select name="source_id" onChange={(e) => handleFormValues(e)}>
            <option hidden>Select Source</option>
            {sources.map((source, key) => (
              <option key={key} value={source.source_id}>
                {source.name}
              </option>
            ))}
            <option value="add_source">Add Source...</option>
          </select>
          <br />
          {entryWeights.map((element, index) => (
            <div className="form-inline" key={element.id}>
              <label>Item</label>
              <select
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
              <label>Weight</label>
              <input
                type="number"
                name="weight"
                onChange={(e) => {
                  element.weight = Number(e.target.value);
                }}
              />

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
          <div className="error-messages">
            {errorMsgs.map((msg, key) => (
              <span key={key}>{msg}</span>
            ))}
          </div>

          <div className="button-section">
            <button
              className="button add"
              type="button"
              onClick={() => addFormFields()}
            >
              +
            </button>
            <br />
            <br />
            <SaveButton>
            <button className="button submit" type="submit">
              Save Entry
            </button>
            </SaveButton>
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
