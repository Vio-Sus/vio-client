import { useState, useEffect } from 'react';
import {
  generateXAxis,
} from '../common/chartHelpers';

import { graphApi } from '../common/mockData';
import { dateToYMD } from '../common/date';
import { getGraphDataset, getSourceGraphDataset } from '../common/network';
import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import LineGraph from '../components/Graph/LineGraph';
import DateFilter from '../components/Filter/DateFilter';
import Button from '../components/Button';
import GraphRightSideKey from '../components/GraphRightSideKey';
import GraphLeftSideFilter from '../components/GraphLeftSideFilter';
import DropDownOptions from '../components/DropDownOptions';

//divs
const DropdownCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
`;

const StyledLink = styled(Link)`
  color: none;
  text-decoration: none;
  position: relative;
`;

const GraphMainCont = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  margin-top: 35px;
  justify-content: space-evenly;
`;

const GraphCont = styled.div`
  width: 60vw;
`;

// In last version, collectors/sources was passed into this
const ViewSourceGraphPage = () => {
  // const [startDate, setStartDate] = useState('2022-03-01');
  // const [endDate, setEndDate] = useState('2022-03-11');
  const [collectors, setCollectors] = useState([])
  const [selectedCollector, setSelectedCollector] = useState(null);

  const todayObj = new Date(new Date().toString());
  const todayMinus100 = new Date(new Date().setDate(todayObj.getDate() - 30));
  const todayDate = dateToYMD(todayObj);
  const [endDate, setEndDate] = useState(todayDate);
  const [today, setToday] = useState(todayDate);
  const defaultStartDate = dateToYMD(todayMinus100);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [xAxisLabels, setXAxisLabels] = useState([]);

  const [datasets, setDatasets] = useState([]);

  // useEffect(() => {
  //   console.log('i am sources', sources);
  //   if (sources.length > 0) {

  //     setSelectedSource(sources[0].name);
  //     console.log('i am selected sources', sources[0])
  //   }
  // }, [sources])
  // changes date range when startdate and enddate are changed
  //for dropdown

  useEffect(() => {
    (async () => {
      if (startDate && endDate) {
        try {
          let labels = await generateXAxis(startDate, endDate);
          setXAxisLabels(labels);
          // console.log('labels are', labels);
          let sums = await getSourceGraphDataset(startDate, endDate);
          setDatasets(sums.data);
          setCollectors(Object.keys(datasets))
          console.log(collectors)
        } catch {}
      } else {
      }
    })();
  }, [startDate, endDate]);

  const handlePrint = () => {
    window.print();
  };

  const handleCollectorSelect = (e) => {
          setSelectedCollector(e.target.value);
          // console.log('NOTHING', datasets);
        }

  return (
    <>
      <div class="pageCont">
        <header>
          <div class="headerCont">
            <h1>Your Entries</h1>
            <h3>Here's an overview of the performance.</h3>
          </div>
          <div class="buttonCont">
            <StyledLink to="/viewData">
              <Button buttoncolor="#4A4A4A" buttontext="List View" />
            </StyledLink>

  {/* TODO: Export data to a PDF or Excel */}
            <Button
              buttoncolor="#4A4A4A"
              buttontext="Print"
              onClick={handlePrint}
            />

            <StyledLink to="/newEntry">
              <Button buttontext="New Entry" />
            </StyledLink>
          </div>
        </header>
        <DropdownCont>
          <DropDownOptions text="Collector" array={collectors} handleChange={handleCollectorSelect}/>
          {/* TODO: Add the ability to show a graph for quantity of items across multiple sources */}
          {/* <DropDownOptions text="Materials" /> */}
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
      )}
        </DropdownCont>

        <GraphMainCont>
          {/* <GraphLeftSideFilter /> */}
          {/* give width & put it in div */}
          <GraphCont>
            {xAxisLabels && datasets && selectedCollector ? (
        <LineGraph
          collectorName={selectedCollector}
          xAxisLabels={xAxisLabels}
          datasets={datasets[selectedCollector]}
        />
      ) : (
        <p>Pick a source from the drop down above to view!</p>
      )}
          </GraphCont>
          {/* <GraphRightSideKey /> */}
          {/* give width & put it in div */}
        </GraphMainCont>
      </div>
    </>
  );
};

export default ViewSourceGraphPage;
