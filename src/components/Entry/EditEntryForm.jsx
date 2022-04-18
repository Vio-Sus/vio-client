import { useState, useEffect } from 'react';
import { getEntry, updateEntry } from '../../common/network';
import styled from 'styled-components';
import CancelIcon from '@mui/icons-material/Cancel';

import Button from '../Button';

const EditFormCont = styled.form`
  display: grid;
  max-width: 300px;
  grid-template-columns: 47% 47%;
  gap: 20px;
  font-size: 12px;
`;

const Cont = styled.div`
  display: grid;
  gap: 10px;
`;

const DateInput = styled.input`
  height: 35px;
  width: 150px;
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
  background-image:
    linear-gradient(45deg, transparent 50%, #80CF76 50%),
    linear-gradient(135deg, #80CF76 50%, transparent 50%),
    radial-gradient(#F1FAF0 70%, transparent 72%);
  background-position:
    139px 13px,
    144px 13px,
    134px 5px;
  background-size:
    5px 5px,
    5px 5px,
    1.5em 1.5em;
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
  background-image:
    linear-gradient(45deg, transparent 50%, #80CF76 50%),
    linear-gradient(135deg, #80CF76 50%, transparent 50%),
    radial-gradient(#F1FAF0 70%, transparent 72%);
  background-position:
    129px 13px,
    134px 13px,
    124px 5px;
  background-size:
    5px 5px,
    5px 5px,
    1.5em 1.5em;
  background-repeat: no-repeat;
`;

const InputCont = styled.div`
  height: 35px;
  width: 150px;
  display: flex;
  align-items: center;
  max-width: 141px;
  padding-left: 10px;
  border-radius: 7px;
  border: 0.5px solid #cbcbcb;
  box-shadow: 0px 2px 4px 0px #7474741a;
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

const ButtonCont = styled.div`
  margin: 20px;
  grid-column-start: 1;
  grid-column-end: 3;
  gap: 40px;
  display: flex;
  justify-content: center;
`;

const PopupWrap = styled.form `
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  background-color: #F9F9F9;
  box-shadow: 0px 2px 4px 0px #7474741a;
  border: solid grey 2px;
  position: absolute;
  border-radius: 10px;
  width: 40vw;
  height: 35vh;
`;

const Label = styled.label`
  font-size:12px;
`;

const CancelButton = styled.div `
  display: flex;
  justify-content: flex-end;
  width: 40vw;
  margin-right:  35px;
  :hover {
        cursor: pointer;
    }
`;

const Heading = styled.div`
  font-size:24px;
  font-weight:400;
  width: 100%;
  color:black;
  display:flex;
  align-items:center;
  justify-content:center;
`;

export default function EditForm({ entry, setIsEditing, items, sources }) {
  // selected entry data
  const [itemId, setItemId] = useState('');
  const [sourceId, setSourceId] = useState('');
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    if (!entry) {
      return;
    }
    console.log({ entry });
    setItemId(entry.item_id);
    setSourceId(entry.source_id);
    setDate(entry.entry_date);
    setWeight(entry.entry_weight);
  }, [entry]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let [entry] = await Promise.all([getEntry(id)]); // returns new promise with all data
  //       setItemId(entry.item_id);
  //       setSourceId(entry.source_id);
  //       setDate(entry.entry_date);
  //       setWeight(entry.entry_weight);
  //     } catch {}
  //   })();
  // }, [id]);

  const handleChange = (e) => {
    let inputName = e.target.name;
    console.log('inputName', inputName);
    switch (inputName) {
      case 'date':
        console.log('date before', date);
        setDate(e.target.value);
        console.log('date after', date);
        break;
      case 'source':
        setSourceId(Number(e.target.value));
        break;
      case 'item':
        console.log('itemId before', itemId);
        setItemId(Number(e.target.value));
        console.log('itemId after', itemId);
        break;
      case 'weight':
        console.log('weight before', weight);
        setWeight(Number(e.target.value));
        console.log('weight after', weight);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    let formContent = {
      itemId,
      sourceId,
      weight,
      date,
    };
    try {
      await updateEntry(entry.entry_id, formContent);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
    <PopupWrap>
      <CancelButton>
          <CancelIcon 
            sx={{ color: "#C4C4C4" }} 
            onClick={handleCancel}>
            Cancel
            </CancelIcon>
          </CancelButton>
          <Heading>Edit Entry:</Heading>
        <EditFormCont id="edit-form">
          <Cont>
            <Label>Sub Account:</Label>
            <Select
              value={sourceId}
              name="source"
              onChange={(e) => handleChange(e)}
            >
              <option hidden>Select Source</option>
              {sources.map((source, key) => (
                <option key={key} value={source.source_id}>
                  {source.name}
                </option>
              ))}
            </Select>
          </Cont>
          <Cont>
            <Label>Collection date:</Label>
            <DateInput
              name="date"
              type="date"
              value={date}
              onChange={(e) => handleChange(e)}
            ></DateInput>
          </Cont>
          <Cont>
            <Label>Material:</Label>
            <Select value={itemId} name="item" onChange={(e) => handleChange(e)}>
              <option hidden>Select Item</option>
              {items.map((item, key) => (
                <option key={key} value={item.item_id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Cont>
          <Cont>
            <Label>Weight:</Label>
            <InputCont>
              <WeightInput
                type="number"
                name="weight"
                value={weight}
                onInput={(e) => handleChange(e)}
              />
              <Suffix>kg</Suffix>
            </InputCont>
          </Cont>
          <ButtonCont>
            <Button 
              onClick={handleSubmit}
              buttonwidth="150px"
              buttonheight="30px"
              buttoncolor='#80CF76'
              textcolor='white'
              buttontext="Save"
              fontsize="14px"
              textweight='450'
              borderweight='solid #80CF76 1px'
            />
            <Button 
              onClick={handleCancel}
              buttonwidth="150px"
              buttonheight="30px"
              buttontext="Cancel"
              fontsize="14px"
              textweight='500'
              textcolor='#80CF76'
              buttoncolor='white'
              borderweight='solid lightgrey 1px'
            />
          </ButtonCont>
        </EditFormCont>
      </PopupWrap>
    </>
  );
}