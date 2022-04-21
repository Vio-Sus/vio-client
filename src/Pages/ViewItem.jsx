import { useState } from 'react';
import ItemsList from '../components/Item/ItemsList';
import EditItemForm from '../components/Item/EditItemForm';
import AddItemForm from '../components/Item/AddItemForm';
import AddItemModal from '../components/Item/AddItemModal';
import Button from '../components/Button';

const ViewItemPage = ({ items }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const selectItem = (item) => {
    console.log('Item selected: ', item);
    setSelectedItem(item);
    setIsEditing(true);
    setIsAddingItem(false);
    return;
  };

  const addItem = () => {
    setIsAddingItem(true);
    setIsEditing(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div class="pageCont">
        <header>
          <div class="headingCont">
            <h1>View Items</h1>
          </div>
          <div class="buttonCont">
            <Button
              buttoncolor="#4A4A4A"
              buttontext="Print"
              onClick={handlePrint}
            />
            <Button buttontext="New Item" onClick={addItem} />
          </div>
        </header>
        <ItemsList selectItem={selectItem}></ItemsList>
        {isEditing && (
          <EditItemForm
            item={selectedItem}
            setIsEditing={setIsEditing}
            setIsAddingItem={setIsAddingItem}
          />
        )}
        {isAddingItem && <AddItemModal setIsAddingItem={setIsAddingItem} />}
      </div>
    </>
  );
};

export default ViewItemPage;
