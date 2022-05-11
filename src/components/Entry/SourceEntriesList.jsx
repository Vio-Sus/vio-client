import { useState, useEffect } from 'react';
import { MONTHS, colors, borderColors } from '../../common/chartHelpers';
import {
  dateToYMD,
  getWeekNumOfMonthOfDate,
  weekCount,
} from '../../common/date';
import { getEntriesByDateRangeForCollector } from '../../common/network';
import { Line, Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

export default function SourceEntriesList() {
  const [entries, setEntries] = useState([]);
  const [entriesByMonth, setEntriesByMonth] = useState([]);
  const [dateRangeEntries, setDateRangeEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [formattedGarbageData, setFormattedGarbageData] = useState([]);
  const [weeklyTotalsData, setWeeklyTotalsData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedSelectedYearMonth = selectedDate
    .toISOString()
    .substring(7, -1);
  let startMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
  let endMonth = new Date().getFullYear();
  // total of one year
  const [totalByYear, setTotalByYear] = useState([]);
  const [totalNum, setTotalNum] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date());
  // const [message, setMessage] = useState(" ")
  const formattedSelectedYear = selectedYear.toISOString().substring(0, 4);
  const todayObj = new Date(new Date().toString());
  const todayMinus100 = new Date(new Date().setDate(todayObj.getDate() - 60));
  const todayDate = dateToYMD(todayObj);
  const defaultStartDate = dateToYMD(todayMinus100);

  const labels = new Date(selectedYear).getFullYear() === new Date().getFullYear() ? months({ count: new Date().getMonth() + 1 }) : months({ count: 12 });
  // const labels = months({ count: 12 })
  // Setting up dates
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(todayDate);
  const [today, setToday] = useState([]);
  const styles = StyleSheet.create({
    page: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

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

  // get the total of weight of the same item_id
  function getTotals(data) {
    const totals = data.reduce((acc, item) => {
      let existMaterial = acc.find(({ item_id }) => item.item_id === item_id);
      if (existMaterial) {
        existMaterial.entry_weight += item.entry_weight;
      } else {
        acc.push({ ...item });
      }

      return acc;
    }, []);
    console.log(totals)
    let initialValue = 0;
    const sum = totals.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue.entry_weight;
    }, initialValue);
    setTotalByYear(totals);
    setTotalNum(sum);
  }

  function filterEntriesByMonths(month) {
    const filtedEntriesByMonths = entries.filter(
      (item) => item.entry_date.substring(0, 7) === month
    );
    return filtedEntriesByMonths;
  }
  function filterEntriesByYears(year, data) {
    const filtedEntriesByYear = data.filter(
      (item) => item.entry_date.substring(0, 4) === year
    );
    return filtedEntriesByYear;
  }
  // console.log('weeknumofmonthdate');
  // console.log(getWeekNumOfMonthOfDate('2024-02-29'));

  let numWeeks = 0;
  // used in useeffect by alex
  function filterEntriesByMonths2(month, entries) {
    numWeeks = weekCount(month);
    console.log('numweeks');
    console.log(numWeeks);
    const filtedEntriesByMonths = entries.filter(
      (item) => item.entry_date.substring(0, 7) === month
    );
    console.log('fil');
    console.log(filtedEntriesByMonths);
    return filtedEntriesByMonths;
  }

  // used for dropdown change by alex
  function filterEntriesByMonths3(month, entries) {
    numWeeks = weekCount(month);
    console.log('numweeks');
    console.log(numWeeks);
    // const filtedEntriesByMonths = entries.filter(
    //   (item) => item.entry_date.substring(0, 7) === month
    // );
    // console.log("fil")
    // console.log(filtedEntriesByMonths)
    return entries;
  }

  const getWeeklyTotals = (data, distinctItems) => {
    // console.log(data);
    // console.log('in 2 looop');
    // console.log(distinctItems.length);
    for (let i = 0; i < distinctItems.length; i++) {
      for (let j = 1; j <= numWeeks; j++) {
        let filtered = data.filter((e) => e.week_of_month === j);
        const weeklyTotal = filtered.reduce((prev, curr) => {
          if (curr.item_id === distinctItems[i].item_id) {
            prev += +curr.entry_weight;
          }
          return prev;
        }, 0);
        distinctItems[i][`week${j}Total`] = weeklyTotal.toFixed(2);

        const monthlyTotal = data.reduce((prev, curr) => {
          if (curr.item_id === distinctItems[i].item_id) {
            prev += +curr.entry_weight;
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

  const selectedYearMonth = filterEntriesByMonths(formattedSelectedYearMonth);

  var filtedDataByMonths = Object.values(
    selectedYearMonth.reduce(
      (acc, { company, item_name, entry_weight = 0 }) => {
        const key = company + '_' + item_name;
        acc[key] = acc[key] || { company, item_name, entry_weight: 0 };
        acc[key].entry_weight += entry_weight;
        // console.log(acc)
        return acc;
      },
      {}
    )
  );

  const labelsItems = filtedDataByMonths
    .reduce(
      (acc, curr) =>
        acc.find((e) => e.item_name === curr.item_name) ? acc : [...acc, curr],
      []
    )
    .map((item) => item.item_name);

  const companyName = filtedDataByMonths
    .reduce(
      (acc, curr) =>
        acc.find((e) => e.company === curr.company) ? acc : [...acc, curr],
      []
    )
    .map((item) => item.company);

  function monthYearData() {
    let barData = [];
    for (let i = 0; i < companyName.length; i++) {
      let result = [];
      barData.push({
        stack: companyName[i],
        label: companyName[i],
        data: result,
        backgroundColor: colors[i],
        borderColor: borderColors[i],
        borderWidth: 1,
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

  const barData = {
    labels: labelsItems,
    datasets: monthYearData(),
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
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          boxHeight: 6,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: `Landfilled vs Diverted in ${formattedSelectedYear}`,
      },
    },
  };
  // for datepicker by year
  const getDataByYear = async (date) => {
    startMonth = new Date(date.getFullYear(), 0, 1);
    endMonth = new Date(date.getFullYear(), 11, 31);
    // console.log(startMonth)
    // console.log(endMonth)
    let [data] = await Promise.all([
      getEntriesByDateRangeForCollector(
        startMonth.toISOString().substring(0, 10),
        endMonth.toISOString().substring(0, 10)
      ),
    ]);
    // console.log("date")
    // console.log(date)
    console.log(data)
    setSelectedYear(date);
    const newData = data.map((item) => {
      return {
        ...item,
        entry_weight: +item.entry_weight,
      };
    });
    generateChartData(newData);
    getTotals(newData);
  };
  // for datepicker by month
  const getTheMonthAndYear = async (date) => {
    startMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    endMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let [data] = await Promise.all([
      getEntriesByDateRangeForCollector(
        startMonth.toISOString().substring(0, 10),
        endMonth.toISOString().substring(0, 10)
      ),
    ]);
    console.log('data');
    console.log(data);
    // console.log(date.getFullYear())
    // console.log(date.getMonth() + 1)
    generateWeeklyTableData(
      filterEntriesByMonths3(
        `${date.getFullYear()}-${date.getMonth() + 1}`,
        data
      )
    );
    setEntriesByMonth(data);
    setSelectedDate(date);
  };

  useEffect(() => {
    (async () => {
      try {
        // `${todayDate.substring(0, 4)}-01-01`,
        let [entries] = await Promise.all([
          getEntriesByDateRangeForCollector(
            `2020-01-01`,
            todayDate
          ),
        ]); // returns new promise with all data
        console.log(entries)
        const newEntries = entries.map((item) => {
          return {
            ...item,
            entry_weight: +item.entry_weight,
          };
        });
        // console.log(newEntries)
        setEntries(newEntries || []);

        // generateChartData(newEntries);
        generateWeeklyTableData(
          filterEntriesByMonths2(`${todayDate.substring(0, 7)}`, newEntries)
        );
        const newData = filterEntriesByYears(`${todayDate.substring(0, 4)}`, newEntries)
        // console.log(newData)
        generateChartData(newData);
        getTotals(newData)
        setSelectedYear(new Date());
      } catch { }
    })();
  }, []);

  // console.log(total);
  const generateChartData = (data) => {
    if (data) {
      console.log(data)
      const mapDayToMonth = data.map((x) => ({
        ...x,
        entry_date: new Date(x.entry_date.substring(0, 7)).getMonth() + 1,
      }));
      // console.log("map day to month")
      // console.log(mapDayToMonth)
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
      // console.log("totals by months")
      // console.log(totalsByMonths)
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
      //console.log(formattedTotalsGarbageByMonths)
      for (let i = 0; i < 12; i++) {
        formattedTotalsByMonths[i] =
          formattedTotalsByMonths[i] - formattedTotalsGarbageByMonths[i];
      }
      setFormattedGarbageData(formattedTotalsGarbageByMonths);
      setFormattedData(formattedTotalsByMonths);
    }
  };

  return (
    <>
      <div class="tableCont">
        <label>Select a year:</label>
        <DatePicker
          selected={selectedYear}
          onChange={(date) => getDataByYear(date)}
          showYearPicker
          dateFormat="yyyy"
          yearItemNumber={6}
        />
        {totalByYear.length !== 0 ? (
          <>
            <br />
            <h3 className="source-headers" style={{ margin: '0 auto' }}>
              Summary in {formattedSelectedYear}
            </h3>
            <table>
              <thead>
                <tr>
                  <th> MATERIALS </th>
                  <th> TOTAL WEIGHT </th>
                </tr>
              </thead>
              <tbody>
                {totalByYear &&
                  totalByYear.map((entry, index) => (
                    <tr key={index}>
                      <td> {entry.item_name} </td>
                      <td> {entry.entry_weight.toFixed(2)} kg </td>
                    </tr>
                  ))}
                {/* add styling for the total of one year */}
                <tr class="totals-row">
                  <td className="total"> Total in {formattedSelectedYear}</td>
                  <td className="total"> {totalNum.toFixed(2)} kg </td>
                </tr>
              </tbody>
            </table>
            <br /> <br /> <br />
            <Line options={options} data={data}></Line>
          </>
        ) : (
          <p>No data for year {formattedSelectedYear}. Please try again.</p>
        )}
        <br /> <br /> <br />
        <label>Select a month:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => getTheMonthAndYear(date)}
          dateFormat="yyyy-MM"
          showMonthYearPicker
          maxDate={new Date()}
          placeholderText={startMonth + endMonth}
        />
        {monthYearData().length !== 0 ? (
          <Bar
            options={{
              plugins: {
                title: {
                  display: true,
                  text: `${formattedSelectedYearMonth} Materials Collected by Collector`,
                },
                legend: {
                  display: true,
                  position: 'top',
                },
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true,
                  },
                },
              },
            }}
            data={barData}
          ></Bar>
        ) : (
          <Bar
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'No data for this month',
                },
                legend: {
                  display: true,
                  position: 'top',
                },
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true,
                  },
                },
              },
            }}
            data={barData}
          ></Bar>
        )}
        <br /> <br /> <br />
        {monthYearData().length !== 0 ? (
          <>
            <h3 className="source-headers" style={{ margin: '0 auto' }}>
              {formattedSelectedYearMonth} Weekly Collection
            </h3>
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
          </>
        ) : (
          <p className="weekly-header">No Weekly Data Available</p>
        )}
      </div>
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
            <Line options={options} data={data}></Line>
          </View>

          <View style={styles.section}>


            {monthYearData().length !== 0 ? <Bar options={{
              plugins: {
                title: {
                  display: true,
                  text: `${formattedSelectedYearMonth} Materials Collected by Collector`
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
            }} data={barData}></Bar> : <Bar options={{
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
          </View>

        </Page>
        <Page size="A4" orientation="landscape" style={styles.page}>

          <View style={styles.section}>
            <Text>Section #2</Text>
            {monthYearData().length !== 0 ?
              <>
                <h3 style={{ margin: '0 auto' }}>{formattedSelectedYearMonth} Weekly Collection</h3>
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

              </>
              : <p className="weekly-header">No Weekly Data Available</p>}

          </View>

          <View style={styles.section}>

            <h3 style={{ margin: '0 auto' }}>Summary in {formattedSelectedYear}</h3>
            <table>
              <thead>
                <tr>
                  <th> MATERIALS </th>
                  <th> TOTAL WEIGHT </th>
                </tr>
              </thead>
              <tbody>
                {totalByYear
                  && totalByYear.map((entry, index) => (
                    <tr key={index}>
                      <td> {entry.item_name} </td>
                      <td> {entry.entry_weight.toFixed(2)} kg </td>
                    </tr>
                  ))}
                {/* add styling for the total of one year */}
                <tr>
                  <td> Total in {formattedSelectedYear}</td>
                  <td> {totalNum.toFixed(2)} kg </td>
                </tr>
              </tbody>
            </table>
          </View>

          {/* <View style={styles.section}>
              <Text>Section #3</Text>
            {monthYearData().length !== 0 ?
          <>
            <h3 style={{ margin: '0 auto' }}>{formattedSelectedYearMonth} Weekly Collection</h3>
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
           
          </>
        : <p className="weekly-header">No Weekly Data Available</p>}
            

            </View> */}

        </Page>
      </Document>
    </>
  );

}
