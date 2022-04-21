import { useState, useEffect } from 'react';
import { getSources } from '../../common/network';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';

export default function SourceList({ selectSource }) {
  const [sources, setSources] = useState([]);
  // useEffect(() => {
  //   getListOfEntries().then((result) => {
  //     console.log(result);
  //     setEntries(result);
  //   });
  // }, []);
  useEffect(() => {
    (async () => {
      try {
        let [sources] = await Promise.all([getSources()]); // returns new promise with all data
        setSources(sources || []);
      } catch {}
    })();
  }, []);

  return (
    <div class="tableCont">
      <table>
        <thead>
          <tr>
            <th> SOURCE </th>
            <th> ADDRESS </th>
            <th> PHONE NUMBER</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source, index) => (
            <tr key={index}>
              <td> {source.name} </td>
              <td> {source.address} </td>
              <td> {source.phone_number} </td>
              <td>
                <IconButton
                  onClick={() => selectSource(source)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <EditIcon sx={{ color: '#888' }}></EditIcon>
                </IconButton>
                {/* Need to add deleteItem function: */}
                {/* <IconButton
                  onClick={() => selectSource(source, 'delete')}
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
    </div>
  );
}
