import { useState, useEffect } from 'react';
import LineGraph from '../components/Graph/LineGraph';
import { dateToYMD } from '../common/date';
import DateFilter from '../components/Filter/DateFilter'
import styled from 'styled-components';
import React from 'react';

import Button from '../components/Button';
import MultipleSelectCheckmarks from '../components/Materialtest';
import GraphRightSideKey from '../components/GraphRightSideKey';
import GraphLeftSideFilter from '../components/GraphLeftSideFilter';
import DropDownOptions from '../components/DropDownOptions';


//divs
const Maincont = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-between ;
  width: 100vw;
  /* background-color:#fad ; */
  align-items: center;
`;

const HeaderCont = styled.div`
  display:flex;
  flex-direction: row ;
  justify-content: space-between;
  width: 80vw;
  /* background-color: red; */
`;

const HeaderTextcont = styled.div`
  display:flex;
  flex-direction: column ;

`;

const ButtonCont = styled.div`
  /* background-color: green ; */
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
`;


const GraphMainCont = styled.div`
  width:100vw;
  display:flex;
  flex-direction: row;
  justify-content: space-evenly ;
`;

const GraphCont = styled.div`
  width: 60vw;
`;

const DropCont = styled.div`
  display:flex;
  flex-direction: column ;
`;
// div end


//texts

const Header = styled.text`
  font-size: 24px;
`;

const Subheader = styled.text`
  font-size: 12px;
  color: #888888;
`;

//dropdown styling
const DateInput = styled.input`
  height: 36px;
  max-width: 141px;
  padding: 0 5px;
  border-radius: 7px;
  border: 0.5px solid #cbcbcb;
  box-shadow: 0px 2px 4px 0px #7474741a;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &::-webkit-calendar-picker-indicator {
    opacity: 0;
  }
  background-image:
    linear-gradient(45deg, transparent 50%, #80CF76 50%),
    linear-gradient(135deg, #80CF76 50%, transparent 50%),
    radial-gradient(#F1FAF0 70%, transparent 72%);
  background-position:
    120px 16px,
    125px 16px,
    115px 8px;
  background-size:
    5px 5px,
    5px 5px,
    1.5em 1.5em;
  background-repeat: no-repeat;
`;

const Label = styled.label`
  font-size: 10px;
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


  return (
    <Maincont>
      <HeaderCont>
        <HeaderTextcont>
                <Header>Graph View</Header>
                <Subheader>Here’s an overview of the performance.</Subheader>
        </HeaderTextcont>
              <ButtonCont>
                <EachButtonCont> 
                  <Button 
                  buttoncolor="#4A4A4A"
                  buttontext="LIST VIEW"
                  
                  />
                </EachButtonCont>
                <EachButtonCont> 
                  <Button
                  buttoncolor="#4A4A4A"
                  buttontext="EXPORT"
                  />
                </EachButtonCont>
                <EachButtonCont> 
                  <Button
                  buttontext="Add New Entry"
                  />
                </EachButtonCont>
              </ButtonCont>

      </HeaderCont>
      <DropdownCont>

          <DropDownOptions text="Sub-Accounts"/>
          <DropDownOptions text="Materials"/>
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
