import { useState, useEffect } from 'react';
import {
  // getCollectors,
  getEntriesByDateRangeForCollector,
} from '../../common/network';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
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
  const [formattedGarbageData, setFormattedGarbageData] = useState([]);
  const [weeklyTotalsData, setWeeklyTotalsData] = useState([]);
  // const [numWeeksInMonth, setNumWeeksInMonth] = useState(null);

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

  const labels = months({ count: new Date().getMonth() });

  const data = {
    labels,
    datasets: [
      {
        label: 'Diverted',
        data: formattedData,
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'white',
      },
      {
        label: 'Landfilled',
        data: formattedGarbageData,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'white',
      },
    ],
  };

  //Config for stacked bar chart
  const barConfig = {
    scales: {
      y: {
        min: 0,
      },
    },
    type: 'bar',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Test',
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  };
  // console.log(formattedData)

  // const DATA_COUNT = 7;
  //const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };
  const colors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(75, 192, 192)',
  ];

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

  // console.log(totals);
  // console.log('Filtered entries: ', filteredEntries);

  function filterEntriesByMonths(month) {
    const filtedEntriesByMonths = entries.filter(
      (item) => item.entry_date.substring(0, 7) === month
    );
    return filtedEntriesByMonths;
  }
  const test = filterEntriesByMonths('2022-04');

  const getWeekNumOfMonthOfDate = (date) => {
    // let monthNum = date.substring(5, 7);
    // if (monthNum[0] === '0') {
    //   monthNum = monthNum[1]; // get second digit
    // }
    var date2 = new Date(date.substring(0, 8) + '01');
    var dayChosen = date.substring(8, 10);
    if (dayChosen[0] === '0') {
      dayChosen = dayChosen[1];
    }
    let day1 = date2.getDay();
    //console.log("day of week of first day " + day1)
    // Sunday - Saturday : 0 - 6

    //console.log("day chosen " + dayChosen)
    // expected output: 2
    let weekCounter = 1;
    for (let i = 1; i < dayChosen; i++) {
      day1++;
      if (day1 >= 6) {
        weekCounter++;
        day1 = -1;
      }
    }
    //console.log(weekCounter)
    return weekCounter;
  };
  // console.log('weeknumofmonthdate');
  // console.log(getWeekNumOfMonthOfDate('2024-02-29'));

  let numWeeks = 0;
  // used in useeffect by alex
  function filterEntriesByMonths2(month, entries) {
    numWeeks = weekCount(month);
    console.log(numWeeks);
    // console.log(wek)
    const filtedEntriesByMonths = entries.filter(
      (item) => item.entry_date.substring(0, 7) === month
    );
    return filtedEntriesByMonths;
  }

  const weekCount = (s) => {
    let year = s.substring(0, 4);
    let monthNum = s.substring(5, 7);
    if (monthNum[0] === '0') {
      monthNum = monthNum[1]; // get second digit
    }
    var firstOfMonth = new Date(+year, +monthNum - 1, 1);
    var lastOfMonth = new Date(+year, +monthNum, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil(used / 7);
  };

  const getWeeklyTotals = (data, distinctItems) => {
    console.log(data);
    // console.log('in 2 looop');
    // console.log(distinctItems.length);
    for (let i = 0; i < distinctItems.length; i++) {
      for (let j = 1; j <= numWeeks; j++) {
        let filtered = data.filter((e) => e.week_of_month === j);
        const weeklyTotal = filtered.reduce((prev, curr) => {
          if (curr.item_id === distinctItems[i].item_id) {
            prev += curr.entry_weight;
          }
          return prev;
        }, 0);
        distinctItems[i][`week${j}Total`] = weeklyTotal.toFixed(2);

        const monthlyTotal = data.reduce((prev, curr) => {
          if (curr.item_id === distinctItems[i].item_id) {
            prev += curr.entry_weight;
          }
          return prev;
        }, 0);
        distinctItems[i]['monthlyTotal'] = monthlyTotal.toFixed(2);
      }
    }
    return distinctItems;
  };

  const generateWeeklyTableData = (test) => {
    const monthlyEntriesWithWeek = test.map((item) => ({
      ...item,
      week_of_month: getWeekNumOfMonthOfDate(item.entry_date),
    }));
    // console.log('monthlyEntriesWithWeek');
    // console.log(monthlyEntriesWithWeek);

    const distinctItems = monthlyEntriesWithWeek.reduce((prev, curr) => {
      let item = prev.find((e) => e.item_id === curr.item_id);
      if (!item) {
        prev.push({ item_name: curr.item_name, item_id: curr.item_id });
      }
      return prev;
    }, []);
    console.log('distinct');
    console.log(distinctItems);

    setWeeklyTotalsData(getWeeklyTotals(monthlyEntriesWithWeek, distinctItems));
  };

  var filtedDataByMonths = Object.values(
    test.reduce((acc, { company, item_name, entry_weight }) => {
      const key = company + '_' + item_name; // unique combination of id and subject
      acc[key] = acc[key] || { company, item_name, entry_weight };
      acc[key].entry_weight += entry_weight;
      return acc;
    }, {})
  );
  // console.log('filter data by months');
  // console.log(filtedDataByMonths);

  const labelsItems = filtedDataByMonths
    .reduce(
      (acc, curr) =>
        acc.find((e) => e.item_name === curr.item_name) ? acc : [...acc, curr],
      []
    )
    .map((item) => item.item_name);

  // console.log('label name');
  // console.log(labelsItems);

  // uneccessary code
  const companyName = filtedDataByMonths
    .reduce(
      (acc, curr) =>
        acc.find((e) => e.company === curr.company) ? acc : [...acc, curr],
      []
    )
    .map((item) => item.company);
  // console.log('company name');
  // console.log(companyName);

  function testData() {
    let barData = [];
    for (let i = 0; i < companyName.length; i++) {
      let result = [];
      barData.push({
        label: companyName[i],
        data: result,
        backgroundColor: colors[i],
      });
      for (let j = 0; j < labelsItems.length; j++) {
        let found = filtedDataByMonths.find(
          (item) =>
            item.company === companyName[i] && item.item_name === labelsItems[j]
        );
        if (found) {
          result.push(found.entry_weight.toFixed(2));
        } else {
          result.push(0);
        }
      }
    }
    return barData;
  }
  // console.log('test data');
  // console.log(testData());

  const barData = {
    labels: labelsItems,
    datasets: testData(),
  };

  // console.log(barData.datasets)

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
        text: `Landfilled vs Diverted in ${new Date().getFullYear()}`,
      },
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

        let [entries] = await Promise.all([
          getEntriesByDateRangeForCollector(
            `${todayDate.substring(0, 4)}-01-01`,
            todayDate
          ),
        ]); // returns new promise with all data
        const newEntries = entries.map((item) => {
          return {
            ...item,
            entry_weight: +item.entry_weight,
          };
        });
        //console.log('==========');
        //console.log(newEntries);

        setEntries(newEntries || []);
        setFilteredEntries(newEntries || []);
        // console.log('Entries: ', newEntries);
        generateWeeklyTableData(filterEntriesByMonths2('2022-04', newEntries));
        generateChartData(newEntries);
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
      } catch {}
    })();
  }, []);

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
  const generateChartData = (data) => {
    if (data) {
      const mapDayToMonth = data.map((x) => ({
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
      //console.log("map day to month for garbage")
      const mapDayToMonthGarbage = mapDayToMonth.filter(
        (item) => item.item_name === 'Garbage'
      );
      //console.log(mapDayToMonthGarbage)
      const totalsByMonthsGarbage = mapDayToMonthGarbage.reduce((acc, item) => {
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
      //console.log(totalsByMonthsGarbage);
      let formattedTotalsByMonths = [];
      let formattedTotalsGarbageByMonths = [];
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
      for (let i = 0; i < 12; i++) {
        let found = totalsByMonthsGarbage.find((item) => item.entry_date === i);
        if (found) {
          formattedTotalsGarbageByMonths.push(
            parseFloat(found.entry_weight.toFixed(2))
          );
        } else {
          formattedTotalsGarbageByMonths.push(0);
        }
      }
      for (let i = 0; i < 12; i++) {
        formattedTotalsByMonths[i] =
          formattedTotalsByMonths[i] - formattedTotalsGarbageByMonths[i];
      }

      setFormattedGarbageData(formattedTotalsGarbageByMonths);
      setFormattedData(formattedTotalsByMonths);
    }
  };

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
      <div className="tableCont">
        <div className="flexRow">
          <div className="flexColumn">
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

          <div className="flexColumn">
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

          <div className="flexColumn">
            <label htmlFor="startDate">Start Date</label>
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

          <div className="flexColumn">
            <label htmlFor="endDate">End Date</label>
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
        <br />
        <h3 style={{ margin: '0 auto' }}>April 2022 Week Collection</h3>
        <br />
        <table>
          <thead>
            <tr>
              <th>Materials</th>
              <th>Week 1</th>
              <th>Week 2</th>
              <th>Week 3</th>
              <th>Week 4</th>
              <th>Week 5</th>
              {weeklyTotalsData.length !== 0 &&
                weeklyTotalsData[0].hasOwnProperty('week6Total') && (
                  <th>Week 6</th>
                )}
              <th>Total weight</th>
            </tr>
          </thead>
          <tbody>
            {weeklyTotalsData.length !== 0 &&
              weeklyTotalsData.map((row, index) => (
                <tr key={index}>
                  <td>{row.item_name}</td>
                  <td>{row.week1Total} kg</td>
                  <td>{row.week2Total} kg</td>
                  <td>{row.week3Total} kg</td>
                  <td>{row.week4Total} kg</td>
                  <td>{row.week5Total} kg</td>
                  {row.week6Total && <td>{row.week6Total} kg</td>}
                  <td>{row.monthlyTotal} kg</td>
                </tr>
              ))}
          </tbody>
        </table>
        <br />
        {formattedData !== [] && <Line options={options} data={data}></Line>}
        <br /> <br /> <br />
        {barData !== [] && <Bar options={barConfig} data={barData}></Bar>}
      </div>
    </>
  );
}
