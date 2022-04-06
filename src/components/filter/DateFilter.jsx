import { useState, useEffect } from 'react';

export default function DateFilter(
  startDate,
  today,
  endDate,
  setStartDate,
  setEndDate
) {
  const [thisStartDate, setThisStartDate] = useState(startDate);
  const [thisEndDate, setThisEndDate] = useState(endDate);
  const [thisToday, setThisToday] = useState(today);

  useEffect(() => {
    setThisStartDate(startDate);
    setThisEndDate(endDate);
    setThisToday(today);
  }, [
    setThisStartDate,
    setThisEndDate,
    setThisToday,
    startDate,
    endDate,
    today,
  ]);

  console.log(
    'inside dateFilter Component',
    thisStartDate,
    thisEndDate,
    thisToday,
    setStartDate,
    setEndDate
  );

  return (
    (thisStartDate, thisEndDate, thisToday) && (
      <>
        Filter by Date Range:
        <label for="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={thisStartDate}
          max={thisToday}
          onChange={setStartDate}
        />
        <label for="endDate">End Date</label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          value={thisEndDate}
          max={thisToday}
          onChange={setEndDate}
        />
      </>
    )
  );
}
