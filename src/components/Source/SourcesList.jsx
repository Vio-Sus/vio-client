import { useState, useEffect } from 'react';
import { getSources } from '../../common/network';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const Table = styled.table`
  width: 80vw;
  margin-top: 25px;
`;

const HeadingWrap = styled.thead`
  color: #606f89;
  font-size: 12px;
  font-weight: 600;
`;

const TR = styled.tr`
  background-color: #ecfaee;
  &:nth-child(even) {
    background-color: white;
  }
`;

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
    <Table>
      <HeadingWrap>
        <tr>
          <th> SOURCE </th>
          <th> ADDRESS </th>
          <th> PHONE NUMBER</th>
        </tr>
      </HeadingWrap>
      <tbody>
        {sources.map((source, index) => (
          <TR key={index}>
            <td> {source.name} </td>
            <td> {source.address} </td>
            <td> {source.phone_number} </td>
            <td>
              <IconButton onClick={() => selectSource(source)}>
                <EditIcon sx={{ color: '#7D90B2' }}></EditIcon>
              </IconButton>
              <IconButton onClick={() => selectSource(source, 'delete')}>
                <Delete sx={{ color: '#7D90B2' }} />
              </IconButton>
            </td>
          </TR>
        ))}
      </tbody>
    </Table>
  );
}
