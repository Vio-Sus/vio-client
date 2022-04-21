import { useState, useEffect } from 'react';
import styled from 'styled-components';

const DropCont = styled.div`
  display: flex;
  flex-direction: column;
`;

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

export default function DateFilter(props) {
  const [thisStartDate, setThisStartDate] = useState(props.startDate);
  const [thisEndDate, setThisEndDate] = useState(props.endDate);
  const [thisToday, setThisToday] = useState(props.today);

  useEffect(() => {
    setThisStartDate(props.startDate);
    setThisEndDate(props.endDate);
    setThisToday(props.today);
  }, []);

  useEffect(() => {
    setThisStartDate(props.startDate);
    setThisEndDate(props.endDate);
    setThisToday(props.today);
  }, [
    setThisStartDate,
    setThisEndDate,
    setThisToday,
    props.startDate,
    props.endDate,
    props.today,
  ]);

  console.log(
    'inside dateFilter Component: ',
    thisStartDate,
    thisEndDate,
    thisToday
  );

  return (
    (thisStartDate, thisEndDate, thisToday) && (
      <>
        <DropCont>
          <div>
            <Label for="startDate">Start Date</Label>
          </div>
          <div>
            <DateInput
              type="date"
              name="startDate"
              id="startDate"
              value={thisStartDate}
              max={thisToday}
              onChange={props.setStartDate}
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
              value={thisEndDate}
              max={thisToday}
              onChange={props.setEndDate}
            />
          </div>
        </DropCont>
      </>
    )
  );
}
