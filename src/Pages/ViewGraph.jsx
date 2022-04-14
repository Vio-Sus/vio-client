import { useState, useEffect } from 'react';
import {
  generateXAxis,
  filterEntriesBySource,
  generateDataset,
} from '../common/chartHelpers';
import LineGraph from '../components/Graph/LineGraph';
import { graphApi } from '../common/mockData';
import { dateToYMD } from '../common/date';
import { getGraphDataset } from '../common/network';
import DateFilter from '../components/Filter/DateFilter';

const ViewGraphPage = () => {
  // const [startDate, setStartDate] = useState('2022-03-01');
  // const [endDate, setEndDate] = useState('2022-03-11');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [today, setToday] = useState([]);

  const todayObj = new Date(new Date().toString());
  const todayMinus100 = new Date(new Date().setDate(todayObj.getDate() - 60));
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
    // {
    //   label: 'Dataset 1', // item name retrieved from api
    //   data: [, , , , , 1, 2, 3, 4, 5, 6, 7, 8], // weights retrieved from api
    //   borderColor: 'rgba(255, 99, 132, 0.5)',
    //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
    // },
    // {
    //   label: 'Dataset 2',
    //   data: [1, 2, 3, 4, 5, 6, 7, 8],
    //   borderColor: 'rgb(53, 162, 235)',
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
    // {
    //   label: 'Coffee Pods',
    //   data: [10],
    //   borderColor: 'rgb(53, 162, 235)',
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
    // {
    //   label: 'Coffee Chaffs',
    //   data: [50],
    //   borderColor: 'rgb(53, 162, 235)',
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
    // {
    //   label: 'Love',
    //   data: [5],
    //   borderColor: 'rgb(53, 162, 235)',
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
    // {
    //   label: 'Sadness',
    //   data: [null, null, null, null, null, null, null, null, 1000],
    //   borderColor: 'rgb(53, 162, 235)',
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
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
        console.log(
          `this is start date ${startDate} and i am end date ${endDate}`
        );
        setXAxisLabels(labels);
        // make request for data from api
        let sums = await getGraphDataset(defaultStartDate, todayDate);
        console.log('sums: ', sums.data);
        // parse data -> filter it by source
        // let sorted = await filterEntriesBySource(sums);
        // console.log('sorted: ', sorted);
        // // make datasets to give to each graph
        // let formated = await generateDataset(sorted, labels);
        // console.log('SOME RANDOM SHIIIIIIIIIT');
        // console.log('formatted: ', formated);
        // set something
        setDatasets(sums.data['Cafe 1']);
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
          console.log('labels are', labels);
          let sums = await getGraphDataset(startDate, endDate);
          setDatasets(sums.data['Cafe 1']);
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
      {(startDate, endDate, today) && (
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
      )}{' '}
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
