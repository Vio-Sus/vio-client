import { useState, useEffect } from 'react';
import { getItems } from '../../common/network';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';

export default function ItemList({ selectItem }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        let [items] = await Promise.all([getItems()]); // returns new promise with all data
        setItems(items || []);
      } catch {}
    })();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th> Item </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td> {item.name} </td>
            <td>
              <IconButton
                onClick={() => selectItem(item)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <EditIcon sx={{ color: '#888' }} />
              </IconButton>
              {/* Need to add deleteItem function: */}
              {/* <IconButton
                onClick={() => deleteItem(item)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Delete sx={{ color: '#888' }} />
              </IconButton> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
