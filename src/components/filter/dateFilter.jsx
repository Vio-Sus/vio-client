const dateFilter = (startDate, today, endDate, setStartDate, setEndDate) => {
  return (
    <>
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
    </>
  );
};
