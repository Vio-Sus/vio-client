import { useState, useEffect } from 'react';
import { dateToYMD } from '../common/date';
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

const DropCont = styled.div`
  display: flex;
  flex-direction: column;
`;
// div end

//dropdown styling
const DateInput = styled.input`
  height: 20px;
  width: 153px;
  padding: 5px;
  border-radius: 7px;
  border: 0.5px solid #cbcbcb;
  box-shadow: 0px 2px 4px 0px #7474741a;
  cursor: pointer;
  appearance: none;
  &:focus {
    outline: none;
  }
  &::-webkit-calendar-picker-indicator {
    opacity: 0;
  }
  background-image: linear-gradient(45deg, transparent 50%, #80cf76 50%),
    linear-gradient(135deg, #80cf76 50%, transparent 50%),
    radial-gradient(#f1faf0 70%, transparent 72%);
  background-position: 139px 13px, 144px 13px, 134px 5px;
  background-size: 5px 5px, 5px 5px, 1.5em 1.5em;
  background-repeat: no-repeat;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #464646;
`;

const ViewGraphPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [today, setToday] = useState([]);

  const todayObj = new Date(new Date().toString());
  const todayMinus100 = new Date(new Date().setDate(todayObj.getDate() - 100));
  const todayDate = dateToYMD(todayObj);
  const defaultStartDate = dateToYMD(todayMinus100);

  //for dropdown

  useEffect(() => {
    (async () => {
      try {
        setToday(todayDate);
        setStartDate(defaultStartDate);
        setEndDate(todayDate);
      } catch {}
    })();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div class="pageCont">
        <header>
          <div class="headerCont">
            <h1>Your Entries</h1>
            <h3>Here’s an overview of the performance.</h3>
          </div>
          <div class="buttonCont">
            <StyledLink to="/viewData">
              <Button buttoncolor="#4A4A4A" buttontext="List View" />
            </StyledLink>

            <Button
              buttoncolor="#4A4A4A"
              buttontext="Export"
              onClick={handlePrint}
            />

            <StyledLink to="/newEntry">
              <Button buttontext="New Entry" />
            </StyledLink>
          </div>
        </header>
        <DropdownCont>
          <DropDownOptions text="Sub Accounts" />
          <DropDownOptions text="Materials" />
          <DropCont>
            <div>
              <Label for="startDate">Start Date</Label>
            </div>
            <div>
              <DateInput
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
          </DropCont>

          <DropCont>
            <div>
              <Label for="endDate">End Date</Label>
            </div>
            <div>
              <DateInput
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
          </DropCont>
        </DropdownCont>

        <GraphMainCont>
          <GraphLeftSideFilter />
          {/* give width & put it in div */}
          <GraphCont>
            <LineGraph sourceName={'source 1'} />
          </GraphCont>
          <GraphRightSideKey />
          {/* give width & put it in div */}
        </GraphMainCont>
      </div>
    </>
  );
};

export default ViewGraphPage;
