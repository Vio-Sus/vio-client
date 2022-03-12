import { useState, useEffect } from 'react';
import LineGraph from '../components/Graph/LineGraph';

const ViewGraphPage = () => {
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
      label: 'Dataset 1',
      data: [1, 2, 3, 4, 5, 6, 7, 8],
      borderColor: 'rgba(255, 99, 132, 0.5)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [1, 2, 3, 4, 5, 6, 7, 8],
      // borderColor: 'rgb(53, 162, 235)',
      // backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ]);

  let mockData = [
    {
      itemName: 'Paper Cups',
      sourceName: 'Cafe 1',
      date: '2022-01-28',
      totalWeight: '5.55',
    },
    {
      itemName: 'Coffee Pods',
      sourceName: 'Cafe 1',
      date: '2022-01-28',
      totalWeight: '15.55',
    },
    {
      itemName: 'Coffee Chaffs',
      sourceName: 'Cafe 1',
      date: '2022-01-28',
      totalWeight: '34.55',
    },
    {
      itemName: 'Love',
      sourceName: 'Cafe 2',
      date: '2022-01-31',
      totalWeight: '50.00',
    },
    {
      itemName: 'Coffee Pods',
      sourceName: 'Cafe 2',
      date: '2022-03-01',
      totalWeight: '10.00',
    },
    {
      itemName: 'Coffee Chaffs',
      sourceName: 'Cafe 2',
      date: '2022-03-01',
      totalWeight: '50.00',
    },
    {
      itemName: 'Love',
      sourceName: 'Cafe 2',
      date: '2022-03-01',
      totalWeight: '5.00',
    },
    {
      itemName: 'Paper Cups',
      sourceName: 'Cafe 1',
      date: '2022-03-03',
      totalWeight: '5.00',
    },
    {
      itemName: 'Coffee Pods',
      sourceName: 'Cafe 1',
      date: '2022-03-03',
      totalWeight: '5.00',
    },
    {
      itemName: 'Coffee Chaffs',
      sourceName: 'Cafe 1',
      date: '2022-03-03',
      totalWeight: '5.00',
    },
    {
      itemName: 'Love',
      sourceName: 'Cafe 1',
      date: '2022-03-03',
      totalWeight: '5.00',
    },
    {
      itemName: 'Paper Cups',
      sourceName: 'Cafe 1',
      date: '2022-03-04',
      totalWeight: '20.00',
    },
    {
      itemName: 'Coffee Pods',
      sourceName: 'Cafe 1',
      date: '2022-03-04',
      totalWeight: '10.00',
    },
    {
      itemName: 'Coffee Chaffs',
      sourceName: 'Cafe 1',
      date: '2022-03-04',
      totalWeight: '20.00',
    },
    {
      itemName: 'Sadness',
      sourceName: 'Cafe 2',
      date: '2022-03-09',
      totalWeight: '1000.00',
    },
  ];

  useEffect(() => {
    // make a request for the entries (getSumsByDateRange)
    // need to have sums and the date
    // parse the response
    // set x AxisLabels
  }, []);
  return (
    <>
      <h1>Graph</h1>
      {xAxisLabels ? (
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
