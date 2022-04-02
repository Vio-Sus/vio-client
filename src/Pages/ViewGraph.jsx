import { useState, useEffect } from 'react';
import { generateXAxis } from '../common/chartHelpers';
import LineGraph from '../components/Graph/LineGraph';
import { graphApi } from '../common/mockData';

const ViewGraphPage = () => {
  const [startDate, setStartDate] = useState('2022-03-01');
  const [endDate, setEndDate] = useState('2022-03-11');

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
    // make a request for the entries (getSumsByDateRange)
    // need to have sums and the date
    // parse the response
    // set x AxisLabels
    let labels = generateXAxis(startDate, endDate);
    setXAxisLabels(labels);
    // make request for data from api
    // parse data -> filter it by source
    // make datasets to give to each graph
    // set something
  }, []);

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
