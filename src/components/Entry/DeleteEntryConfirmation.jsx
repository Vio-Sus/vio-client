import { useState, useEffect } from 'react';
import { deleteEntry, getEntry } from '../../common/network';
import { findItem, findSource } from '../../setIdToNames';
import styled from 'styled-components';
import CancelIcon from '@mui/icons-material/Cancel';

import Button from '../Button';

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

const EditFormCont = styled.form`
  display: grid;
  max-width: 300px;
  grid-template-columns: 47% 47%;
  gap: 20px;
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
  width: 65%;
  color:black;
  display:flex;
  text-align:center;
  align-items:center;
  justify-content:center;
`;

const ButtonCont = styled.div`
  margin: 20px;
  grid-column-start: 1;
  grid-column-end: 3;
  gap: 40px;
  display: flex;
  justify-content: center;
`;

const EntryCont = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const EntryRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  font-size: 16px;
`;



export default function DeleteConfirmation({
  entry,
  setIsDeleting,
  items,
  sources,
}) {
  // const [entryId] = useState(id);
  // const [itemName, setItemName] = useState('');
  // const [sourceName, setSourceName] = useState('');
  // const [date, setDate] = useState('');
  // const [weight, setWeight] = useState(0);

  const [itemId, setItemId] = useState('');
  const [sourceId, setSourceId] = useState('');
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState(0);

  //   useEffect(() => {
  //   (async () => {
  //     try {
  //       let [entry] = await Promise.all([getEntry(id)]); // returns new promise with all data
  //       let item = findItem(entry.item_id, items).name;
  //       let source = findSource(entry.source_id, sources).name;
  //       setItemName(item);
  //       setSourceName(source);
  //       setDate(entry.entry_date);
  //       setWeight(entry.entry_weight);

  //     } catch {}
  //   })();
  // }, [id]);

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

  const handleDelete = () => {
    deleteEntry(entry.entry_id).then((res) => {
      console.log(res);
      setIsDeleting(false);
      window.location.reload();
    });
  };

  const handleCancel = () => {
    setIsDeleting(false);
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
      <Heading>Are you sure you want to delete the following entry?</Heading>
        <EntryCont>
            <EntryRow>Date: {date}</EntryRow>
            <EntryRow>Item: {itemId}</EntryRow>
            <EntryRow>Weight: {weight} kg</EntryRow>
            <EntryRow>Source: {sourceId}</EntryRow>
        </EntryCont>
          <EditFormCont>
            <ButtonCont>
                <Button 
                  onClick={handleDelete}
                  buttonwidth="150px"
                  buttonheight="30px"
                  buttoncolor='#F86E6E'
                  textcolor='white'
                  buttontext="Save"
                  fontsize="14px"
                  textweight='450'
                  borderweight='solid #F86E6E 1px'
                />
                <Button 
                  onClick={handleCancel}
                  buttonwidth="150px"
                  buttonheight="30px"
                  buttontext="Cancel"
                  ontsize="14px"
                  textweight='500'
                  textcolor='#F86E6E'
                  buttoncolor='white'
                  borderweight='solid lightgrey 1px'
                />
              </ButtonCont>
          </EditFormCont>
      </PopupWrap>
    </>
  );
}
