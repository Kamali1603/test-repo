import React, { useState, useEffect } from 'react';
import axios from 'axios'
const ItemCrud = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');

  // Fetch all items when the component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://crudcrud.com/api/d2782f5462254fe9b69940ef31737a69/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
console.log(items)
//   const handleAddItem = async () => {
//     debugger
//     try {
//       const response = await fetch('https://crudcrud.com/api/d2782f5462254fe9b69940ef31737a69', {
//         method: 'POST',
//         mode: 'no-cors',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: newItemName }),
//       });
//       console.log(response); // Log the response to inspect it
//       const newItem = await response.json();
//       setItems([...items, newItem]);
//       setNewItemName('');
//     } catch (error) {
//       console.error('Error adding item:', error);
//     }
//   };

  const handleAddItem = async () => {
    try {
      const response = await axios.post('https://crudcrud.com/api/d2782f5462254fe9b69940ef31737a69/items', {
        name: newItemName,
      });

      console.log('Item added:', response.data);

      // Optionally, you can update the UI to display the newly added item
      // For example, add the response.data to the existing items list in your state
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
  

  const handleUpdateItem = async (itemId, newName) => {
    try {
      const response = await fetch(`https://crudcrud.com/api/d2782f5462254fe9b69940ef31737a69/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });
      if (response.ok) {
        const updatedItems = items.map((item) =>
          item.id === itemId ? { ...item, name: newName } : item
        );
        setItems(updatedItems);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    debugger
    console.log(itemId)
    try {
      const response = await axios.delete(`https://crudcrud.com/api/d2782f5462254fe9b69940ef31737a69/items/${itemId}`
       );
      if (response.ok) {
        const updatedItems = items.filter((item) => item.id !== itemId);
        setItems(updatedItems);
      }
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h2>Items List</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => handleUpdateItem(item._id, `Ajith`)}>Update</button>
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button onClick={handleAddItem}>Add New Item</button>
      </div>
    </div>
  );
};

export default ItemCrud;
