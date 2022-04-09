import { useState, useEffect } from 'react';
import { getListOfEntries, getEntriesByDateRange } from '../../common/network';
import styled from 'styled-components';
// import Summary from '../Summary/Summary';
// import DateFilter from '../filter/DateFilter';


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
      )}{' '} */}
      {/* Filter by Date Range: */}
      <Cont>
      <FilterCont>
        <FilterType>
          <FilterText>Start Date</FilterText>
          {/* <label for="startDate">Start Date</label> */}
          <Input
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
          <Input
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
      </FilterCont>
      
      <Table>
        <HeadingWrap>
          <DataRow>
            <TH> DATE </TH>
            <TH> SUB ACCOUNTS </TH>
            <TH> MATERIAL </TH>
            <TH> WEIGHT </TH>
            <TH></TH>
          </DataRow>
        </HeadingWrap>
        <TBody>
          {filteredEntries
            ? filteredEntries.map((entry, index) => (
                <TR key={index}>
                  <DataRow>
                    <TD> {entry.entry_date} </TD>
                    <TD> {entry.source_name}</TD>
                    <TD> {entry.item_name} </TD>
                    <TD> {entry.entry_weight} kg </TD>
                  <TD>
                    <button onClick={() => selectEntry(entry, 'edit')}>
                      Edit
                    </button>
                    <button onClick={() => selectEntry(entry, 'delete')}>
                      Delete
                    </button>
                  </TD>
                  </DataRow>
          
       
                </TR>
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

const Select = styled.select`
  width: 152px;
  height: 30px;
  background-color: #fff;
  border-color: #CBCBCB;
  border-radius:7px;
  text-align: flex-start;
`;

const Input = styled.input`
  width: 152px;
  height: 30px;
  border-width: 1px;
  border-color: #CBCBCB;
  border-radius:7px;
  text-align: center;
`;

const FilterCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70vw;
`;

const DataCont = styled.div`
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

export const HeadingWrap = styled.thead`
  width: 80vw;
`;

export const TFoot = styled.tfoot`

`;

export const TBody = styled.tbody`
`;

export const DataRow = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
`;

export const TR = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
`;

export const TH = styled.th`
  font-size: 14px;
  color: #606F89;
  text-transform: uppercase;
  width:200px;
`;

export const TD = styled.td`
  background-color: #ECFAEE;
  width:200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TB = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;