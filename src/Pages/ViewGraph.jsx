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

const ViewGraphPage = ({ sources }) => {
  // const [startDate, setStartDate] = useState('2022-03-01');
  // const [endDate, setEndDate] = useState('2022-03-11');
  const [selectedSource, setSelectedSource] = useState(null);

  const todayObj = new Date(new Date().toString());
  const todayMinus100 = new Date(new Date().setDate(todayObj.getDate() - 60));
  const todayDate = dateToYMD(todayObj);
  const [endDate, setEndDate] = useState(todayDate);
  const [today, setToday] = useState(todayDate);
  const defaultStartDate = dateToYMD(todayMinus100);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [xAxisLabels, setXAxisLabels] = useState([]);

  const [datasets, setDatasets] = useState([]);

  // changes date range when startdate and enddate are changed
  useEffect(() => {
    (async () => {
      if (startDate && endDate) {
        try {
          let labels = await generateXAxis(startDate, endDate);
          setXAxisLabels(labels);
          console.log('labels are', labels);
          let sums = await getGraphDataset(startDate, endDate);
          setDatasets(sums.data);
        } catch {}
      } else {
      }
    })();
  }, [startDate, endDate]);

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
      <select
        onChange={(e) => {
          setSelectedSource(e.target.value);
          console.log('NOTHING', datasets);
        }}
      >
        <option hidden>Select Source</option>
        {sources.map((source, key) => (
          <option key={key} value={source.name}>
            {source.name}
          </option>
        ))}
      </select>
      {xAxisLabels && datasets && selectedSource ? (
        <LineGraph
          sourceName={selectedSource}
          xAxisLabels={xAxisLabels}
          datasets={datasets[selectedSource]}
        />
      ) : (
        <p>'Select a source to view...'</p>
      )}
    </>
  );
};

export default ViewGraphPage;
