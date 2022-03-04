import { useState } from 'react';
import ItemsList from '../components/Item/ItemsList';
import EditItemForm from '../components/Item/EditItemForm';
import AddItemForm from '../components/Item/AddItemForm';

const ViewItemPage = ({ items }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const selectItem = (item) => {
    console.log('Item selected: ', item);
    setSelectedItem(item);
    setIsEditing(true);
    setIsAdding(false);
    return;
  };

  const addItem = () => {
    setIsAdding(true);
    setIsEditing(false);
  };

  return (
    <>
      <h1>View Items</h1>
      <button onClick={addItem}>Add New Item</button>
      <ItemsList selectItem={selectItem}></ItemsList>
      {isEditing && (
        <EditItemForm
          item={selectedItem}
          setIsEditing={setIsEditing}
          setIsAdding={setIsAdding}
        />
      )}
      {isAdding && <AddItemForm setIsAdding={setIsAdding} />}
    </>
  );
};

export default ViewItemPage;
