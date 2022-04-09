import { useState, useEffect } from 'react';
import { getSources } from '../../common/network';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const T = styled.table`
  width: 1000px;
  margin-top:25px;
`;

const HeadingWrap = styled.thead`
  width: 2000px;
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
          <th> SOURCE </th>
          <th> ADDRESS </th>
          <th> PHONE NUMBER</th>
        </tr>
      </HeadingWrap> 
      <tbody>
        {sources.map((source, index) => (
          <tr key={index}>
            <TD> {source.name} </TD>
            <TD> {source.address} </TD>
            <TD> {source.phone_number} </TD>
            <TD>
              <IconButton onClick={() => selectSource(source)}>
              <EditIcon sx={{ color: "#7D90B2" }} ></EditIcon>
             </IconButton>
            </TD>
          </tr>
        ))}
      </tbody>
    </T>
  );
}
