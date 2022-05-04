import { useState, useEffect } from 'react';
import { getCollectors, getEntriesByDateRangeForCollector } from '../../common/network';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
// import Summary from '../Summary/Summary';
// import DateFilter from '../Filter/DateFilter';
// import IconButton from '@mui/material/IconButton';
// import Delete from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

export default function SourceEntriesList({ collectors, items }) {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [collectorList, setCollectorList] = useState([]);
  const [total, setTotals] = useState([]);

  function months(config) {
    var cfg = config || {};
    var count = cfg.count || 12;
    var section = cfg.section;
    var values = [];
    var i, value;
  
    for (i = 0; i < count; ++i) {
      value = MONTHS[Math.ceil(i) % 12];
      values.push(value.substring(0, section));
    }
  
    return values;
  }

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const NUMBER_CFG = {count: 12, min: -100, max: 100};
  const labels = months({count: 12});

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [10,20,30],
        borderColor: "red",
        backgroundColor: "white",
      }
    ]
  };

  const options = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    },
  };


  // Setting up dates
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
  const todayMinus100 = new Date(new Date().setDate(todayObj.getDate() - 60));
  const todayDate = dateToYMD(todayObj);
  const defaultStartDate = dateToYMD(todayMinus100);

  useEffect(() => {
    (async () => {
      try {
        setToday(todayDate);
        setStartDate(defaultStartDate);
        setEndDate(todayDate);
        setTotals(filteredEntries);
        let test = `${new Date(todayDate).getFullYear()}-01-01`
        //console.log(test)
        let [entries] = await Promise.all([
          getEntriesByDateRangeForCollector(`${new Date(todayDate).getFullYear()}-01-01`, todayDate),
        ]); // returns new promise with all data
        const newEntries = entries.map((item) => {
          return { ...item, entry_weight: +item.entry_weight }
        })
        setEntries(newEntries || []);
        setFilteredEntries(newEntries || []);
        console.log('Entries: ', newEntries);
        makeCollectorList(entries)
      } catch { }
    })();
  }, []);

  const mapDayToMonth = entries.map(x => ({ ...x, entry_date: new Date(x.entry_date).getMonth() }));

  //console.log(mapDayToMonth);

  // get the total of weight of the same item_id
  const totalsByMonths = mapDayToMonth.reduce((acc, item) => {
    let existMaterial = acc.find(({ entry_date }) => item.entry_date === entry_date);
    if (existMaterial) {
      existMaterial.entry_weight += item.entry_weight
      //console.log(existMaterial.entry_weight)
    } else {
      acc.push({ ...item })
    }
    return acc
  }, [])
  //console.log(totalsByMonths)

  function formatTotalsByMonths() {
    let formattedTotalsByMonths = [];
    for(let i = 0; i <12; i++){
      let found= totalsByMonths.find((item ) => item.entry_date === i);
      if(found){
        formattedTotalsByMonths.push(parseFloat(found.entry_weight.toFixed(2)))
      }else{
        formattedTotalsByMonths.push(0)
      }
    }
    return formattedTotalsByMonths
  }
console.log()


  // useEffect(() => {
  //   (async () => {
  //     if (startDate && endDate) {
  //       try {
  //         let [entriesDateRange] = await Promise.all([
  //           getEntriesByDateRangeForCollector(startDate, endDate),
  //         ]);
  //         setEntries(entriesDateRange);
  //         console.log(entriesDateRange)
  //         setFilteredEntries(entriesDateRange || []);          
  //       } catch {}
  //     } else {
  //       let [entriesDateRange] = await Promise.all([getListOfSourcesForCollector()]);

  //       setEntries(entriesDateRange);
  //       setFilteredEntries(entriesDateRange || []);

  //     }
  //   })();
  // }, [startDate, endDate]);

  // console.log(total);

  const updateFilter = () => {
    let itemSelection = document.getElementById('itemSelection').value;
    let sourceSelection = document.getElementById('collectorSelection').value;

    if (sourceSelection === 'allCollectors' && itemSelection === 'allItems') {
      setFilteredEntries(entries);
    } else if (sourceSelection === 'allCollectors') {
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
  // get the total of weight of the same item_id
  const totals = entries.reduce((acc, item) => {
    let existMaterial = acc.find(({ item_id }) => item.item_id == item_id);
    if (existMaterial) {
      existMaterial.entry_weight += item.entry_weight
      console.log(existMaterial.entry_weight)
    } else {
      acc.push({ ...item })
    }
    return acc
  }, [])

  const makeCollectorList = (entries) => {
    let uniqueCollectorEntries = entries.distinct
  }



  // console.log(totals);
  console.log('Filtered entries: ', filteredEntries);

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
      <div class="tableCont">
        <div class="flexRow">
          <div class="flexColumn">
            <label>Collectors</label>
            <select id="collectorSelection" onChange={(e) => updateFilter()}>
              <option value="allCollectors">All</option>
              {entries.map((collector, key) => (
                <option key={key} value={collector.account_id}>
                  {collector.company}
                </option>
              ))}
            </select>
          </div>

          {/* <div class="flexColumn">
            <label>Processor</label>
            <select>
              <option>All</option>
            </select>
          </div> */}

          <div class="flexColumn">
            <label>Materials</label>
            <select id="itemSelection" onChange={(e) => updateFilter()}>
              <option value="allItems">All</option>
              {entries.map((item, key) => (
                <option key={key} value={item.item_id}>
                  {item.item_name}
                </option>
              ))}
            </select>
          </div>

          <div class="flexColumn">
            <label for="startDate">Start Date</label>
            <input
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
          </div>

          <div class="flexColumn">
            <label for="endDate">End Date</label>
            <input
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
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th> COLLECTOR</th>
              <th> MATERIALS </th>
              <th> DATE </th>
              <th> WEIGHT </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries
              ? filteredEntries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.company}</td>
                  {/* <td> P1 </td> */}
                  <td> {entry.item_name} </td>
                  <td> {entry.entry_date} </td>
                  <td> {entry.entry_weight} kg </td>
                  <td>
                    {/* <IconButton onClick={() => selectEntry(entry, 'edit')}>
                        <EditIcon sx={{ color: '#606f89' }} />
                      </IconButton>
                      <IconButton onClick={() => selectEntry(entry, 'delete')}>
                        <Delete sx={{ color: '#606f89' }} />
                      </IconButton> */}
                  </td>
                </tr>
              ))
              : null}
          </tbody>
        </table>
        <br /><br /><br />
        <table>
          <thead>
            <tr>
              <th> MATERIALS </th>
              <th> TOTAL WEIGHT </th>
            </tr>
          </thead>
          <tbody>
            {totals
              ? totals.map((entry, index) => (
                <tr key={index}>
                  <td> {entry.item_name} </td>
                  <td> {entry.entry_weight.toFixed(2)} kg </td>
                </tr>
              ))
              : null}
          </tbody>
        </table>
        <Line options={options} data={data}></Line>
      </div>
    </>
  );


}