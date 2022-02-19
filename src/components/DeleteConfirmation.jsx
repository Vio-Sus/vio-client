import { useState, useEffect } from 'react';
import { deleteEntry, getEntry } from '../network';
import { findItem, findSource } from '../setIdToNames';

export default function DeleteConfirmation({
  entry,
  setIsDeleting,
  items,
  sources,
}) {
  // const [entryId] = useState(id);
  // const [entry, setEntry] = useState('');
  const [itemName, setItemName] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    if (!entry) {
      return;
    }
    console.log({ entry });
    setItemName(entry.item_name);
    setSourceName(entry.source_name);
    setDate(entry.entry_date);
    setWeight(entry.entry_weight);
  }, [entry]);

  const handleDelete = async () => {
    try {
      await deleteEntry(entry.entry_id).then((res) => {
        console.log(res);
        setIsDeleting(false);
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsDeleting(false);
  };

  return (
    <>
      <h3>Are you sure you want to delete this entry?</h3>
      <p>
        Date: {date} <br />
        Item: {itemName} <br />
        Weight: {weight} kg
        <br />
        Source: {sourceName} <br />
      </p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleCancel}>Cancel</button>
    </>
  );
}
