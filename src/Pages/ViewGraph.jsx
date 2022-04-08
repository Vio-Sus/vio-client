import { useState, useEffect } from 'react';
import LineGraph from '../components/Graph/LineGraph';
import { dateToYMD } from '../common/date';
import styled from 'styled-components';
import React from 'react';

import Button from '../components/Button';
import MultipleSelectCheckmarks from '../components/Materialtest';
import GraphRightSideKey from '../components/GraphRightSideKey';
import GraphLeftSideFilter from '../components/GraphLeftSideFilter';

//page styling

const Maincont = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-between ;
  width: 100vw;
  background-color:#fad ;
  align-items: center;
`;

const HeaderCont = styled.div`
  display:flex;
  flex-direction: row ;
  justify-content: space-between;
  width: 80vw;
  background-color: red;
`;

const HeaderTextcont = styled.div`
  display:flex;
  flex-direction: column ;

`;

const ButtonCont = styled.div`
  background-color: green ;
  display:flex;
  flex-direction: row;
`;
const EachButtonCont = styled.div`
    margin: .3rem;
`;

const DropdownCont = styled.div`
  display:flex;
  flex-direction: row ;
  justify-content: flex-start;
  width: 80vw;
  background-color: red;
`;

const GraphMainCont = styled.div`
  width:100vw;
  display:flex;
  flex-direction: row;
  background-color:green ;
  justify-content: space-evenly ;
`;

const GraphCont = styled.div`
  width: 60vw;
`;

const Header = styled.text`
  font-size: 24px;
`;

const Subheader = styled.text`
  font-size: 12px;
  color: #888888;
`;


const ViewGraphPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [today, setToday] = useState([]);

  const todayObj = new Date(new Date().toString());
  const todayMinus100 = new Date(new Date().setDate(todayObj.getDate() - 100));
  const todayDate = dateToYMD(todayObj);
  const defaultStartDate = dateToYMD(todayMinus100);

  useEffect(() => {
    (async () => {
      try {
        setToday(todayDate);
        setStartDate(defaultStartDate);
        setEndDate(todayDate);
      } catch {}
    })();
  }, []);

  return (
    <Maincont>
      <HeaderCont>
        <HeaderTextcont>
                <Header>Graph View</Header>
                <Subheader>Here’s an overview of the performance.</Subheader>
        </HeaderTextcont>
              <ButtonCont>
                <EachButtonCont> 
                  <Button/>
                </EachButtonCont>
                <EachButtonCont> 
                  <Button/>
                </EachButtonCont>
                <EachButtonCont> 
                  <Button/>
                </EachButtonCont>
              </ButtonCont>

      </HeaderCont>
      <DropdownCont>
          <MultipleSelectCheckmarks/>
          <MultipleSelectCheckmarks/>
          <MultipleSelectCheckmarks/>
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
      </DropdownCont>

     <GraphMainCont>
      <GraphLeftSideFilter/>
      {/* give width & put it in div */}
        <GraphCont>
          <LineGraph sourceName={'source 1'} />
        </GraphCont>
      <GraphRightSideKey/>
            {/* give width & put it in div */}
     </GraphMainCont>

    </Maincont>
  );
};

export default ViewGraphPage;
