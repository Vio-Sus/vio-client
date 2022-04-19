
import { useState, useEffect } from 'react';
import { getListOfEntries, getEntriesByDateRange } from '../../common/network';
import styled from 'styled-components';
// import Summary from '../Summary/Summary';
// import DateFilter from '../Filter/DateFilter';

import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import AddCircle from '@mui/icons-material/AddCircle';
import AllButton from '../AllButton';



export default function EntriesList({ selectEntry, sources, items }) {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  // const [itemFilter, setItemfilter] = useState('');
  // const [sourceFilter, setSourcefilter] = useState('');

  //setting up dates
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [today, setToday] = useState([]);

  // grabbed from binibin-repo
  const dateToYMD = (date) => {
    let yyyy = date.getFullYear();
    let mm = (date.getMonth() + 1).toString().padStart(2, '0');
    let dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const todayObj = new Date(new Date().toString());
  const todayMinus100 = new Date(new Date().setDate(todayObj.getDate() - 100));
  // useEffect(() => {
  //   getListOfEntries().then((result) => {
  //     console.log(result);
  //     setEntries(result);
  //   });
  // }, []);
  const todayDate = dateToYMD(todayObj);
  const defaultStartDate = dateToYMD(todayMinus100);
  useEffect(() => {
    (async () => {
      try {
        //set up dates for date input
        // const todayDate = dateToYMD(todayObj);
        // const defaultStartDate = dateToYMD(todayMinus100);
        setToday(todayDate);
        setStartDate(defaultStartDate);
        setEndDate(todayDate);

        let [entries] = await Promise.all([
          getEntriesByDateRange('2020-01-01', todayDate),
        ]); // returns new promise with all data
        setEntries(entries || []);
        setFilteredEntries(entries || []);
        console.log({ sources });
      } catch {}
    })();
  }, []);

  // changes date range when startdate and enddate are changed
  useEffect(() => {
    (async () => {
      if (startDate && endDate) {
        try {
          let [entriesDateRange] = await Promise.all([
            getEntriesByDateRange(startDate, endDate),
          ]);
          setEntries(entriesDateRange);
          setFilteredEntries(entriesDateRange || []);
        } catch {}
      } else {
        let [entriesDateRange] = await Promise.all([getListOfEntries()]);
        setEntries(entriesDateRange);
        setFilteredEntries(entriesDateRange || []);
      }
    })();
  }, [startDate, endDate]);

  const updateFilter = () => {
    let itemSelection = document.getElementById('itemSelection').value;
    let sourceSelection = document.getElementById('sourceSelection').value;

    if (sourceSelection === 'allSources' && itemSelection === 'allItems') {
      setFilteredEntries(entries);
    } else if (sourceSelection === 'allSources') {
      let filtered = entries.filter((entry) => {
        if (entry['item_id'] === +itemSelection) {
          return entry;
        }
      });
      setFilteredEntries(filtered);
    } else if (itemSelection === 'allItems') {
      let filtered = entries.filter((entry) => {
        if (entry['source_id'] === +sourceSelection) {
          return entry;
        }
      });
      setFilteredEntries(filtered);
    } else {
      let filtered = entries.filter((entry) => {
        if (entry['source_id'] === +sourceSelection) {
          return entry;
        }
      });
      filtered = filtered.filter((entry) => {
        if (entry['item_id'] === +itemSelection) {
          return entry;
        }
      });
      setFilteredEntries(filtered);
    }
  };

  return (
    <>
      {/* {(startDate, endDate, today) && (
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          today={today}
          setStartDate={(e) => {
            setStartDate(e.target.value);
          }}
          setEndDate={(e) => {
            setEndDate(e.target.value);
          }}
        />
      )}{' '}  */}
      {/* Filter by Date Range: */}
      <Cont>
      <FilterCont>

      <FilterType>
          <FilterText>Sub Accounts</FilterText>
          <Select id="sourceSelection" onChange={(e) => updateFilter()}>
            <option value="allSources">All</option>
            {sources.map((source, key) => (
              <option key={key} value={source.source_id}>
                {source.name}
              </option>
            ))}
          </Select>
        </FilterType>

        {/* <FilterType>
          <FilterText>Processor</FilterText>
          <Select>
            <option>All</option>
          </Select>
        </FilterType> */}

        <FilterType>
          <FilterText>Materials</FilterText>
          <Select id="itemSelection" onChange={(e) => updateFilter()}>
            <option value="allItems">All</option>
            {items.map((item, key) => (
              <option key={key} value={item.item_id}>
                {item.name}
              </option>
            ))}
          </Select>
        </FilterType>

        <FilterType>
          <FilterText>Start Date</FilterText>
          {/* <label for="startDate">Start Date</label> */}
          <DateInput
            type="date"
            name="startDate"
            id="startDate"
            value={startDate}
            max={today}
            onChange={(e) => {
              setStartDate(e.target.value);
              // dateRangeFilter();
            }}
          />
        </FilterType>

        <FilterType>
          <FilterText>End Date</FilterText>
          {/* <label for="endDate">End Date</label> */}
          <DateInput
            type="date"
            name="endDate"
            id="endDate"
            value={endDate}
            max={today}
            onChange={(e) => {
              setEndDate(e.target.value);
              // dateRangeFilter();
            }}
          />
        </FilterType>
        {/* <AllButtonCont>
          <AllButton/>
        </AllButtonCont> */}

{/* 
        <FilterType>
          <FilterText>Status</FilterText>
          <Select >
            <option>All</option>
          </Select>
        </FilterType> */}

      </FilterCont>
      
      <Table>
        <HeadingWrap>
          <DataRow>
            {/* <DivCont/> */}
            <TH> SUB ACCOUNTS</TH>
            {/* <TH> PROCESSOR </TH> */}
            <TH> MATERIALS </TH>
            <TH> DATE </TH>
            <TH> WEIGHT </TH>
            {/* <TH> STATUS </TH> */}
            <TH></TH>
          </DataRow>
        </HeadingWrap>
        <TBody>
          {filteredEntries
            ? filteredEntries.map((entry, index) => (
              <EntryColumn>
                <TR key={index}>
                  <DataRow>
                  {/* <DivCont><SelectDiv/></DivCont> */}
                    <TD>{entry.source_name}</TD>
                    {/* <TD> P1 </TD> */}
                    <TD> {entry.item_name} </TD>
                    <TD> {entry.entry_date} </TD>
                    <TD> {entry.entry_weight} kg </TD>
                    {/* <TD> Processed </TD> */}
                  <TD>
                    <IconButton onClick={() => selectEntry(entry, 'edit')}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={() => selectEntry(entry, 'delete')}>
                        <Delete fontSize="small"/>
                    </IconButton>
                    </TD>
                    </DataRow>
                </TR>
              </EntryColumn>
              ))
            : null}
        </TBody>
      </Table>
      </Cont>
      {/* <Summary startDate={'2022-01-01'} endDate={'2022-03-10'} /> */}
      {/* <Summary startDate={startDate} endDate={endDate} /> */}
    </>
  );
}

// const Select = styled.select`
//   width: 152px;
//   height: 30px;
//   background-color: #fff;
//   border-color: #CBCBCB;
//   border-radius:7px;
//   text-align: flex-start;
// `;

const Select = styled.select`
  height: 30px;
  width: 153px;
  padding: 5px;
  border-radius: 7px;
  border: 0.5px solid #cbcbcb;
  box-shadow: 0px 2px 4px 0px #7474741a;
  cursor: pointer;
  appearance: none;
  &:focus {
    outline: none;
  }
  background-image:
    linear-gradient(45deg, transparent 50%, #80CF76 50%),
    linear-gradient(135deg, #80CF76 50%, transparent 50%),
    radial-gradient(#F1FAF0 70%, transparent 72%);
  background-position:
    129px 13px,
    134px 13px,
    124px 5px;
  background-size:
    5px 5px,
    5px 5px,
    1.5em 1.5em;
  background-repeat: no-repeat;
`;

const AllButtonCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -75px;
  width: 150px;
  height: 50px;
`;

const DateInput = styled.input`
  height: 30px;
  width: 153px;
  padding: 0 5px;
  border-radius: 7px;
  border: 0.5px solid #cbcbcb;
  box-shadow: 0px 2px 4px 0px #7474741a;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &::-webkit-calendar-picker-indicator {
    opacity: 0;
  }
  background-image:
    linear-gradient(45deg, transparent 50%, #80CF76 50%),
    linear-gradient(135deg, #80CF76 50%, transparent 50%),
    radial-gradient(#F1FAF0 70%, transparent 72%);
  background-position:
    139px 13px,
    144px 13px,
    134px 5px;
  background-size:
    5px 5px,
    5px 5px,
    1.5em 1.5em;
  background-repeat: no-repeat;
`;

const DivCont = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 25px;  
  margin-left: 15px;
` 
const SelectDiv = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: solid grey 2px;
  background-color: white;
`;

const FilterCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
`;

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
`;

const FilterType = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterText = styled.text`
  font-size: 14px;
  font-weight: 500;
  color: #464646;
`;

const Table = styled.table`
  margin-top: 50px;
  width: 80vw;
`;

const HeadingWrap = styled.thead`
  width: 80vw;
`;

const DataRow = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
`;

const EntryColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80vw;
`;

const TR = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
  margin-top: 5px;
  background-color: #ECFAEE;
`;

const TH = styled.th`
  font-size: 14px;
  color: #606F89;
  text-transform: uppercase;
  width:200px;
`;

const TD = styled.td`
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;