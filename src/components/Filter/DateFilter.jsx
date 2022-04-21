import { useState, useEffect } from 'react';

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
        <div class="flexColumn">
          <div>
            <label for="startDate">Start Date</label>
          </div>
          <div>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={thisStartDate}
              max={thisToday}
              onChange={props.setStartDate}
            />
          </div>
        </div>

        <div class="flexColumn">
          <div>
            <label for="endDate">End Date</label>
          </div>
          <div>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={thisEndDate}
              max={thisToday}
              onChange={props.setEndDate}
            />
          </div>
        </div>
      </>
    )
  );
}
