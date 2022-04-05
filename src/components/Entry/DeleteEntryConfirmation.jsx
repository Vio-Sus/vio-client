import { useState, useEffect } from 'react';
import { deleteEntry, getEntry } from '../../common/network';
import { findItem, findSource } from '../../setIdToNames';

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
      <h3>Are you sure you want to delete this entry?</h3>
      <p>
        Date: {date} <br />
        Item: {itemId} <br />
        Weight: {weight} kg
        <br />
        Source: {sourceId} <br />
      </p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleCancel}>Cancel</button>
    </>
  );
}
