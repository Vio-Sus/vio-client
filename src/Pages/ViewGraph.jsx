import { useState, useEffect } from 'react';
import { generateXAxis } from '../common/chartHelpers';
import LineGraph from '../components/Graph/LineGraph';
import { graphApi } from '../common/mockData';
import { dateToYMD } from '../common/date';

const ViewGraphPage = () => {
  // const [startDate, setStartDate] = useState('2022-03-01');
  // const [endDate, setEndDate] = useState('2022-03-11');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [today, setToday] = useState([]);

  const todayObj = new Date(new Date().toString());
  const todayMinus100 = new Date(new Date().setDate(todayObj.getDate() - 100));
  const todayDate = dateToYMD(todayObj);
  const defaultStartDate = dateToYMD(todayMinus100);
  const [xAxisLabels, setXAxisLabels] = useState([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ]);

  const [datasets, setDatasets] = useState([
    {
      label: 'Dataset 1', // item name retrieved from api
      data: [, , , , , 1, 2, 3, 4, 5, 6, 7, 8], // weights retrieved from api
      borderColor: 'rgba(255, 99, 132, 0.5)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [1, 2, 3, 4, 5, 6, 7, 8],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        setToday(todayDate);
        setStartDate(defaultStartDate);
        setEndDate(todayDate);
        // make a request for the entries (getSumsByDateRange)
        // need to have sums and the date
        // parse the response
        // set x AxisLabels
        let labels = await generateXAxis(startDate, endDate);
        setXAxisLabels(labels);
        // make request for data from api
        // parse data -> filter it by source
        // make datasets to give to each graph
        // set something
      } catch {}
    })();
  }, []);

  // changes date range when startdate and enddate are changed
  useEffect(() => {
    (async () => {
      if (startDate && endDate) {
        try {
          let labels = await generateXAxis(startDate, endDate);
          setXAxisLabels(labels);
        } catch {}
      } else {

      }
    })();
  }, [startDate, endDate]);

  //  graphs.map((graph) => (
  //    <LineGraph
  //      sourceName={graph.source}
  //      xAxisLabels={xAxisLabels}
  //      datasets={graph.datasets}
  //    />
  //  ));
  return (
    <>
      <h1>Graph</h1>
      Filter by Date Range:
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
      {xAxisLabels && datasets ? (
        <LineGraph
          sourceName={'source 1'}
          xAxisLabels={xAxisLabels}
          datasets={datasets}
        />
      ) : (
        'Loading...'
      )}
    </>
  );
};

export default ViewGraphPage;
