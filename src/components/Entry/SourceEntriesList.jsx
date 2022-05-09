import { useState, useEffect } from 'react';
import { getCollectors, getEntriesByDateRangeForCollector } from '../../common/network';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { Line, Bar } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


// import Summary from '../Summary/Summary';
// import DateFilter from '../Filter/DateFilter';
// import IconButton from '@mui/material/IconButton';
// import Delete from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

export default function SourceEntriesList() {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [collectorList, setCollectorList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [total, setTotals] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const currentMonthYear = new Date().getFullYear() + "-" + (new Date().getMonth()+1).toString().padStart(2,'0');
  const [selectedDate, setSelectedDate] = useState(new Date())


  console.log(selectedDate);
  console.log(currentMonthYear)
  const formattedSelectedYearMonth = selectedDate.toISOString().substring(7,-1);

  console.log(formattedSelectedYearMonth) 

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
    'December',
  ];

  const labels = months({ count: 12 });

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: formattedData,
        borderColor: 'red',
        backgroundColor: 'white',
      },
    ],
  };

  const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink'];

  function filterEntriesByMonths(month) {
    const entriesByMonths = entries.map((item) => ({
      ...item,
      entry_date: item.entry_date.substring(0, 7),
    }))
    const filtedEntriesByMonths = entriesByMonths.filter((item) => item.entry_date == month)
    return filtedEntriesByMonths
  }
  const test = filterEntriesByMonths(formattedSelectedYearMonth)

  

  var filtedDataByMonths = Object.values(test.reduce((acc, { company, item_name, entry_weight }) => {

    const key = company + '_' + item_name; 
    acc[key] = acc[key] || { company, item_name, entry_weight };
    acc[key].entry_weight += entry_weight;
    return acc;
  }, {}));
 

  const labelsItems = filtedDataByMonths.reduce(
    (acc, curr) =>
      acc.find((e) => e.item_name  === curr.item_name )
        ? acc
        : [...acc, curr],
    []
  ).map((item) => item.item_name)

  const companyName = filtedDataByMonths.reduce(
    (acc, curr) =>
      acc.find((e) => e.company === curr.company)
        ? acc
        : [...acc, curr],
    []
  ).map((item) => item.company);

  function testData() {
    let barData = []
    for (let i = 0; i < companyName.length; i++) {
      let result = []
      barData.push(
        {
          stack: companyName[i],
          label: companyName[i],
          data: result,
          backgroundColor: colors[i]
        })
      for (let j = 0; j < labelsItems.length; j++) {
        let found = filtedDataByMonths.find((item) => item.company == companyName[i] && item.item_name == labelsItems[j])
        if (found) {
          result.push(found.entry_weight.toFixed(2))
        } else {
          result.push(0)
        }
      }
    }
    return barData
  }


  console.log(testData())
  const barData = {
    labels: labelsItems,
    datasets:testData(),
  };
      
  //Config for line chart
  const options = {
    scales: {
      y: {
        min: 0,
      },
    },
    responsive: true,
    spanGaps: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          boxHeight: 6,
          padding: 20,
          //legend styling
        },
      },
      title: {
        display: true,
        text: `Total weight over time for (${new Date().getFullYear()})`,
      },
    },
  };

  console.log(options)

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

  // Setting up dates
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(todayDate);
  const [today, setToday] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setToday(todayDate);
        // setStartDate(defaultStartDate);
        // setEndDate(todayDate);
        setTotals(filteredEntries);        
        
        let [entries] = await Promise.all([
          getEntriesByDateRangeForCollector(startDate, endDate),
        ]); // returns new promise with all data
        const newEntries = entries.map((item) => {
          return { ...item, entry_weight: +item.entry_weight };
        });
        console.log('==========');
        console.log(newEntries);
        if (newEntries !== []) {
          const mapDayToMonth = newEntries.map((x) => ({
            ...x,
            entry_date: new Date(x.entry_date).getMonth(),
          }));
          const totalsByMonths = mapDayToMonth.reduce((acc, item) => {
            let existMaterial = acc.find(
              ({ entry_date }) => item.entry_date === entry_date
            );
            if (existMaterial) {
              existMaterial.entry_weight += item.entry_weight;
              //console.log(existMaterial.entry_weight)
            } else {
              acc.push({ ...item });
            }
            return acc;
          }, []);
          let formattedTotalsByMonths = [];
          for (let i = 0; i < 12; i++) {
            let found = totalsByMonths.find((item) => item.entry_date === i);
            if (found) {
              formattedTotalsByMonths.push(
                parseFloat(found.entry_weight.toFixed(2))
              );
            } else {
              formattedTotalsByMonths.push(0);
            }
          }
          setFormattedData(formattedTotalsByMonths);
        }
        setEntries(newEntries || []);
        setFilteredEntries(newEntries || []);
        console.log('Entries: ', newEntries);

        // Reduce the entries list so you only have unique collectors (for dropdown menu)
        const uniqueCollectors = entries.reduce(
          (acc, curr) =>
            acc.find((e) => e.account_id === curr.account_id)
              ? acc
              : [...acc, curr],
          []
        );
        setCollectorList(uniqueCollectors);

        // Reduce the entries list so you only have unique items (for dropdown menu)
        const uniqueItems = entries.reduce(
          (acc, curr) =>
            acc.find((e) => e.item_id === curr.item_id) ? acc : [...acc, curr],
          []
        );
        setItemList(uniqueItems);
      } catch { }
    })();
  }, [startDate, endDate]);

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
    let collectorSelection =
      document.getElementById('collectorSelection').value;

    if (
      collectorSelection === 'allCollectors' &&
      itemSelection === 'allItems'
    ) {
      setFilteredEntries(entries);
    } else if (collectorSelection === 'allCollectors') {
      let filtered = entries.filter((entry) => {
        if (entry['item_id'] === +itemSelection) {
          return entry;
        }
      });
      setFilteredEntries(filtered);
    } else if (itemSelection === 'allItems') {
      let filtered = entries.filter((entry) => {
        if (entry['account_id'] === +collectorSelection) {
          return entry;
        }
      });
      setFilteredEntries(filtered);
    } else {
      let filtered = entries.filter((entry) => {
        if (entry['account_id'] === +collectorSelection) {
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
    let existMaterial = acc.find(({ item_id }) => item.item_id === item_id);
    if (existMaterial) {
      existMaterial.entry_weight += item.entry_weight;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

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
              {collectorList.map((collector, key) => (
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
              {itemList.map((item, key) => (
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
        <br />
        <br />
        <br />
        <h3 style={{ margin: '0 auto' }}>Summary</h3>
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
        <br /> <br /> <br />
        {formattedData !== [] && <Line options={options} data={data}></Line>}
        <br /> <br /> <br />
        <label>See data by month</label>    
          <DatePicker          
           selected={selectedDate}
           onChange={(date) => setSelectedDate(date)}
           dateFormat="yyyy-MM"
           showMonthYearPicker                     
           maxDate={new Date()}
           placeholderText={currentMonthYear}           
          />
        {testData().length !== 0  ? <Bar options = {{
        plugins: {
            title: {
              display: true,
              text: `(${formattedSelectedYearMonth}) Materials Collected by Collector`
            },
           legend: { 
              display: true, 
              position: "top"
            },
            scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,               
            },            
          }
        }      
    }} data={barData}></Bar> : <Bar options = {{
        plugins: {
            title: {
              display: true,
              text: "No data for this month"
            },
           legend: { 
              display: true, 
              position: "top"
            },
            scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,               
            },            
          }
        }      
    }} data={barData}></Bar>}
      </div>
    </>
  );
}
