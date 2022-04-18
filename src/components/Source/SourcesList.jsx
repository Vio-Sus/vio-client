import { useState, useEffect } from 'react';
import { getSources } from '../../common/network';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { TableBody } from 'semantic-ui-react';

const Table = styled.table`
  width: 80vw;
  margin-top: 25px;
`;

const EntryColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80vw;
`;

// const TD = styled.td`
//   background-color:#ECFAEE;
//   width: 80vw;
//   color:##2E3B52;
// `;

const TD = styled.td`
  width: 250px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DataRow = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
  margin-top: 5px;
  background-color: #ECFAEE;
`;

const HeadingWrap = styled.thead`
  width: 80vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
`;

const TH = styled.th`
  font-size: 14px;
  color: #606F89;
  text-transform: uppercase;
  width:250px;
`;

const TR = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
  margin-top: 5px;
  background-color: #ECFAEE;
`;

const Table = styled.table`
  width: 80vw;
`;

const TBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
<<<<<<< HEAD
    <Cont>
    <Table>
        <HeadingWrap>
          <TH> SOURCE </TH>
          <TH> ADDRESS </TH>
          <TH> PHONE NUMBER</TH>
          <TH></TH>
        </HeadingWrap>
    <TBody>
      <EntryColumn>
        <TBody>
        {sources.map((source, index) => (
          <DataRow key={index}>
            <TD> {source.name} </TD>
            <TD> {source.address} </TD>
            <TD> {source.phone_number} </TD>
            <TD>
=======
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
>>>>>>> 429469aa830cec0ddbc3931535bc0d503094786c
              <IconButton onClick={() => selectSource(source)}>
                <EditIcon sx={{ color: '#7D90B2' }}></EditIcon>
              </IconButton>
              <IconButton onClick={() => selectSource(source, 'delete')}>
                <Delete sx={{ color: '#7D90B2' }} />
              </IconButton>
<<<<<<< HEAD
            </TD>
          </DataRow>
        ))}
        </TBody>
      </EntryColumn>
     </TBody>
    </Table>
    </Cont>
=======
            </td>
          </TR>
        ))}
      </tbody>
    </Table>
>>>>>>> 429469aa830cec0ddbc3931535bc0d503094786c
  );
}
