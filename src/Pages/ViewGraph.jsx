import { useState, useEffect } from 'react';
import LineGraph from '../components/Graph/LineGraph';
import { dateToYMD } from '../common/date';
import DateFilter from '../components/filter/DateFilter'
import styled from 'styled-components';
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

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


const DropdownCont = styled.div`
  display:flex;
  flex-direction: row ;
  justify-content: space-between;
  width: 80vw;
  
`;

const StyledLink = styled(Link)`
  color: none;
  text-decoration: none;
  position: relative;
`;


const GraphMainCont = styled.div`
  width:100vw;
  display:flex;
  flex-direction: row;
  margin-top: 35px;
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
  background-image:
    linear-gradient(45deg, transparent 50%, #80CF76 50%),
    linear-gradient(135deg, #80CF76 50%, transparent 50%),
    radial-gradient(#F1FAF0 70%, transparent 72%);
  background-position:
    139px 13px,
    144px 13px,
    134px 5px;
  background-size:
    5px 5px,
    5px 5px,
    1.5em 1.5em;
  background-repeat: no-repeat;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #464646;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Header = styled.text`
  font-size: 36px;
  font-weight: 300;
  color: black;
`;

const Subheader = styled.text`
  font-size: 18px;
  font-weight: 400;
  color: #888888;
`;

const HeaderCont = styled.div`
  display:flex;
  flex-direction: row ;
  justify-content: space-between;
  width: 80vw;
`;

const HeaderTextcont = styled.div`
  display:flex;
  flex-direction: column;
`;

const ButtonCont = styled.div`
  display: flex;
  flex-direction: row;
`;

const Spacer = styled.div`
  display: flex;
  height: 50px;
`;

const EachButtonCont = styled.div`
  margin: .3rem;
`;

const Top = styled.div`
  display:flex;
  margin-top: 7vh;
  margin-left: 233px;
  margin-right:233px;
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
  <Page>
    <Maincont>
      <Top>
        <HeaderCont>
          <HeaderTextcont>
              <Header>Your Entries</Header>
              <Subheader>Here’s an overview of the performance.</Subheader>
          </HeaderTextcont>
                <ButtonCont>
                  <EachButtonCont>
                    <StyledLink to='/viewData'>
                      <Button 
                        buttoncolor="#4A4A4A"
                        buttontext="List View"
                      />
                    </StyledLink>
                  </EachButtonCont>
                  <EachButtonCont> 
                    <Button
                      buttoncolor="#4A4A4A"
                      buttontext="Export"
                    />
                  </EachButtonCont>
                  <EachButtonCont>
                    <StyledLink to='/newEntry'>
                      <Button
                        buttontext="New Entry"
                      />
                    </StyledLink>
                  </EachButtonCont>
                </ButtonCont>
        </HeaderCont>
      </Top>
      <Spacer></Spacer>
      <DropdownCont>
          <DropDownOptions text="Sub Accounts"/>
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
  </Page>
  );
};

export default ViewGraphPage;
