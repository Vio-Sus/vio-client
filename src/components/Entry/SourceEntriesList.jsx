import { useState, useEffect } from 'react';
import {
  getCollectors,
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
    // unecessary extra code
    // const entriesByMonths = entries.map((item) => ({
    //   ...item,
    //   entry_date: item.entry_date.substring(0, 7),
    // }));
    const filtedEntriesByMonths = entries.filter(
      (item) => item.entry_date.substring(0, 7) === month
    );
    return filtedEntriesByMonths;
  }
  const test = filterEntriesByMonths('2022-04');
  // console.log('test entries for 2022-04');
  // console.log(test);

  // weekly table
  // console.log("entries")
  // console.log(entries)
  const getWeekNumOfMonthOfDate = (date) => {
    let d = new Date(
      date.substring(0, 4),
      date.substring(5, 7),
      date.substring(8, 10)
    );
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
    return Math.ceil((d.getDate() + (firstDay - 1)) / 7);
  };

  //const aprilDate = "2022-04"
  // const weekNumOfDate = getWeekNumOfMonthOfDate(new Date(aprilDate.substring(0,4), aprilDate.substring(5,7), 20));
  // console.log("week of month date")
  // console.log(weekNumOfDate);
  const monthlyEntriesWithWeek = test.map((item) => ({
    ...item,
    week_of_month: getWeekNumOfMonthOfDate(item.entry_date),
  }));
  console.log('monthlyEntriesWithWeek');
  console.log(monthlyEntriesWithWeek);

  const getWeeklyTotals = (data, weekNumber) => {
    const newData = data.filter((item) => item.week_of_month === weekNumber);
    let total = newData.reduce((acc, item) => {
      let existMaterial = acc.find(({ item_id }) => item.item_id === item_id);
      if (existMaterial) {
        existMaterial.entry_weight += item.entry_weight;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);
    // console.log('fitlered totoasl');
    // console.log(total);
    return total;
  };
  console.log('week 1 total');
  console.log(getWeeklyTotals(monthlyEntriesWithWeek, 1));

  const monthlyTotals = monthlyEntriesWithWeek.reduce((acc, item) => {
    let existMaterial = acc.find(({ item_id }) => item.item_id === item_id);
    if (existMaterial) {
      existMaterial.entry_weight += item.entry_weight;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);
  console.log('monthly totals');
  console.log(monthlyTotals);

  function createWeeklyTotalArray(data, weekNumber) {
    if (getWeeklyTotals(data, weekNumber).length === 0) {
      return new Array(data.length).fill(0);
    } else if (
      getWeeklyTotals(data, weekNumber).length === monthlyTotals.length
    ) {
      return getWeeklyTotals(data, weekNumber);
    }
    return getWeeklyTotals(data, weekNumber).concat(
      new Array(data.length - getWeeklyTotals(data, weekNumber).length).fill(0)
    );
  }
  const weeklyTotals = monthlyTotals.map((item) => ({
    ...item,
    week1Totals: createWeeklyTotalArray(monthlyEntriesWithWeek, 1),
    week2Totals: createWeeklyTotalArray(monthlyEntriesWithWeek, 2),
    week3Totals: createWeeklyTotalArray(monthlyEntriesWithWeek, 3),
    week4Totals: createWeeklyTotalArray(monthlyEntriesWithWeek, 4),
  }));

  console.log('weekly totals');
  console.log(weeklyTotals);
  ///////////////////////////end of weekly table calculation //////////////

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

  // for(let i = 0; i < datasets.length; i++) {
  //   barChartData.push({
  //     label[i],
  //     data[i],
  //     backgroundColor
  //   })
  // }

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
        fontSize: 16,
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
        if (newEntries !== []) {
          const mapDayToMonth = newEntries.map((x) => ({
            ...x,
            entry_date: new Date(x.entry_date).getMonth(),
          }));
          //console.log('map day to month');
          //console.log(mapDayToMonth);
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
          const totalsByMonthsGarbage = mapDayToMonthGarbage.reduce(
            (acc, item) => {
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
            },
            []
          );
          //console.log(totalsByMonthsGarbage)
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
            let found = totalsByMonthsGarbage.find(
              (item) => item.entry_date === i
            );
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
          //console.log("formatted totals garbage")
          //console.log(formattedTotalsGarbageByMonths)
          //console.log("formatted totals")
          //console.log(formattedTotalsByMonths)
          setFormattedGarbageData(formattedTotalsGarbageByMonths);
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
        <table>
          <thead>
            <tr>
              <th>Materials</th>
              <th>Week 1</th>
              <th>Week 2</th>
              <th>Week 3</th>
              <th>Week 4</th>
              <th>Total weight</th>
            </tr>
          </thead>
          <tbody>
            {weeklyTotals.map((entry, index) => (
              <tr key={index}>
                <td>{entry.item_name}</td>
                <td>
                  {entry.week1Totals[index].entry_weight 
                    ? entry.week1Totals[index].entry_weight
                    : 0}
                </td>
                <td>
                  {entry.week2Totals[index].entry_weight
                    ? entry.week2Totals[index].entry_weight
                    : 0}
                </td>
                <td>
                  {entry.week3Totals[index].entry_weight
                    ? entry.week3Totals[index].entry_weight
                    : 0}
                </td>
                <td>
                  {entry.week4Totals[index].entry_weight
                    ? entry.week4Totals[index].entry_weight.toFixed(2)
                    : 0}
                </td>
                <td>{entry.entry_weight.toFixed(2)} kg</td>
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
