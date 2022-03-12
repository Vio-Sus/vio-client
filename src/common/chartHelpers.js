import { dateToYMD } from './date';

export const generateXAxis = (startDate, endDate) => {
  let start = new Date(`"${startDate}"`);
  let end = new Date(`"${endDate}"`);
  let XAxisArray = [dateToYMD(start)];
  do {
    start = new Date(start.setDate(start.getDate() + 1));
    XAxisArray.push(dateToYMD(start));
  } while (dateToYMD(start) != dateToYMD(end));
  console.log(XAxisArray);
  return XAxisArray;
};
