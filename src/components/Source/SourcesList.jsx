import { useState, useEffect } from 'react';
import { getSources } from '../../common/network';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const T = styled.table`
  width: 80vw;
  margin-top: 25px;
`;

const TR = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
  background-color: #ecfaee;
`;

const HeadingWrap = styled.thead`
  width: 80vw;
`;

const Heading = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
`;

const TD = styled.td`
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TH = styled.th`
  font-size: 14px;
  color: #606f89;
  text-transform: uppercase;
  width: 200px;
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
    <T>
      <HeadingWrap>
        <Heading>
          <TH> NAME </TH>
          <TH> TYPE </TH>
          <TH> PHONE NUMBER</TH>
          <TH> ADDRESS </TH>
          <TH> EMAIL </TH>
          <TH />
          {/* <TH> NOTES </TH> */}
        </Heading>
      </HeadingWrap>
      <TBody>
        {sources.map((source, index) => (
          <TR key={index}>
            <TD> {source.name} </TD>
            <TD> {source.type} </TD>
            <TD> {source.phone_number} </TD>
            <TD> {source.address} </TD>
            <TD> {source.email} </TD>
            {/* <TD> {source.notes} </TD> */}
            <TD>
              <IconButton onClick={() => selectSource(source)}>
                <EditIcon sx={{ color: '#7D90B2' }}></EditIcon>
              </IconButton>
              <IconButton>
              {/* <IconButton onClick={() => selectSource(source, 'delete')}> */}
                <Delete sx={{ color: '#7D90B2' }} />
              </IconButton>
            </TD>
          </TR>
        ))}
      </TBody>
    </T>
  );
}