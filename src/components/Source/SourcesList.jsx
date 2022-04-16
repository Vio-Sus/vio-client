import { useState, useEffect } from 'react';
import { getSources } from '../../common/network';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const T = styled.table`
  width: 80vw;
  margin-top:25px;
`;

const HeadingWrap = styled.thead`
  width: 80vw;
  color:#606F89;
  font-size:12px;
  font-weight:600;
`;

const TD = styled.td`
background-color:#ECFAEE;
width: 1000px;
color:##2E3B52;
`


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
    <T>
      <HeadingWrap>
        <tr>
          <th> NAME </th>
          <th> TYPE </th>
          <th> PHONE NUMBER</th>
          <th> ADDRESS </th>
          <th> EMAIL </th>
          <th> NOTES </th>
        </tr>
      </HeadingWrap> 
      <tbody>
        {sources.map((source, index) => (
          <tr key={index}>
            <TD> {source.name} </TD>
            <TD> {source.type} </TD>
            <TD> {source.phone_number} </TD>
            <TD> {source.address} </TD>
            <TD> {source.email} </TD>
            <TD> {source.notes} </TD>
            <TD>
              <IconButton onClick={() => selectSource(source)}>
              <EditIcon sx={{ color: "#7D90B2" }} ></EditIcon>
             </IconButton>
             <IconButton onClick={() => selectSource(source, 'delete')}>
                <Delete sx={{ color: "#7D90B2" }}/>
              </IconButton>
            </TD>
          </tr>
        ))}
      </tbody>
    </T>
  );
}
