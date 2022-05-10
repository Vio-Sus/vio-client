import { useState, useEffect } from 'react';
import { dateToYMD } from '../../common/date';
import { getEntriesByDateRangeForCollector } from '../../common/network';
import { Line, Bar } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import Chart from 'chart.js/auto';


export default function SourceDetails() {

  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [collectorList, setCollectorList] = useState([]);
  const [totals, setTotals] = useState([]);
  const [itemList, setItemList] = useState([]);
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

        setEntries(newEntries || []);
        setFilteredEntries(newEntries || []);

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
                  <td> {entry.item_name} </td>
                  <td> {entry.entry_date} </td>
                  <td> {entry.entry_weight} kg </td>
                </tr>
              ))
              : null}
          </tbody>
        </table>      
      </div>
    </>
  );
}
