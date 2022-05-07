import { useState, useEffect } from 'react';
import { deleteEntry, getEntry } from '../../common/network';
import { findItem, findSource } from '../../setIdToNames';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

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

  // const [itemId, setItemId] = useState('');
  // const [sourceId, setSourceId] = useState('');
  // const [date, setDate] = useState('');
  // const [weight, setWeight] = useState(0);

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

  // useEffect(() => {
  //   if (!entry) {
  //     return;
  //   }
  //   console.log({ entry });
  //   setItemId(entry.item_id);
  //   setSourceId(entry.source_id);
  //   setDate(entry.entry_date);
  //   setWeight(entry.entry_weight);
  // }, [entry]);

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
    <div class="modal">
      <div class="modalContent">
        <div class="modalClose">
          <IconButton
            onClick={handleCancel}
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
                transform: 'scale(1.1)',
              },
            }}
          >
            <CancelIcon />
          </IconButton>
        </div>
        <h2>Are you sure you want to delete the following entry?</h2>
        <p>Source: {entry.source_name}</p>
        <p>Item: {entry.item_name}</p>
        <p>Date: {entry.entry_date}</p>
        <p>Weight: {entry.entry_weight} kg</p>
        <div class="buttonCont">
          <button onClick={handleDelete} class="submitButton red">
            Delete Entry
          </button>
        </div>
      </div>
    </div>
  );
}
