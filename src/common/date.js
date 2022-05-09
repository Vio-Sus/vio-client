export function dateToYMD(date) {
  let yyyy = date.getFullYear();
  let mm = (date.getMonth() + 1).toString().padStart(2, '0');
  let dd = date.getDate().toString().padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function makeToday() {
  const todayObj = new Date(new Date().toString());
  const todayDate = dateToYMD(todayObj);
  return todayDate;
}

export function makeDefaultStartDate(daysPassed) {
  const todayObj = new Date(new Date().toString());
  const todayMinus100 = new Date(
    new Date().setDate(todayObj.getDate() - daysPassed)
  );
  const defaultStartDate = dateToYMD(todayMinus100);
  return defaultStartDate;
}

export const getWeekNumOfMonthOfDate = (date) => {
  var date2 = new Date(date.substring(0, 8) + '01');
  var dayChosen = date.substring(8, 10);
  if (dayChosen[0] === '0') {
    dayChosen = dayChosen[1];
  }
  let day1 = date2.getDay();
  //console.log("day of week of first day " + day1)
  // Sunday - Saturday : 0 - 6

  //console.log("day chosen " + dayChosen)
  // expected output: 2
  let weekCounter = 1;
  for (let i = 1; i < dayChosen; i++) {
    day1++;
    if (day1 >= 6) {
      weekCounter++;
      day1 = -1;
    }
  }
  //console.log(weekCounter)
  return weekCounter;
};


export const weekCount = (s) => {
  let year = s.substring(0, 4);
  let monthNum = s.substring(5, 7);
  if (monthNum[0] === '0') {
    monthNum = monthNum[1]; // get second digit
  }
  var firstOfMonth = new Date(+year, +monthNum - 1, 1);
  var lastOfMonth = new Date(+year, +monthNum, 0);

  var used = firstOfMonth.getDay() + lastOfMonth.getDate();

  return Math.ceil(used / 7);
};