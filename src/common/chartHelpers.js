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

function compare(a, b) {
  if (a.item_name < b.item_name) {
    return -1;
  }
  if (a.item_name > b.item_name) {
    return 1;
  }
  return 0;
}

const colours = [
  'rgba(255, 99, 132, 0.7)',
  'rgba(54, 162, 235, 0.7)',
  'rgba(255, 206, 86, 0.7)',
  'rgba(75, 192, 192, 0.7)',
  'rgba(153, 102, 255, 0.7)',
  'rgba(255, 159, 64, 0.7)',
];

export const loadChart = async (
  data,
  xAxisLabels,
  itemNames,
  datasets,
  colours
) => {
  // set the x axis labels
  data.forEach((entry) => {
    if (!xAxisLabels.includes(entry.input_date)) {
      xAxisLabels.push(entry.input_date);
    }
  });
  xAxisLabels.sort();
  // set the data values
  xAxisLabels.forEach((date, i) => {
    console.log(date, i);
    data.forEach((entry, j) => {
      if (entry.input_date === date) {
        if (!itemNames.includes(entry.item_name)) {
          // add item name and first value if first time encountering item
          itemNames.push(entry.item_name);
          console.log('adding new item', itemNames.length - 1);
          let newData = [];
          newData[i] = entry.daily_weight;
          datasets.push({
            label: entry.item_name,
            data: newData,
            borderColor: colours[itemNames.length - 1],
            backgroundColor: colours[itemNames.length - 1],
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
          });
        } else {
          // find obj with corresponding item name and push new value at array position matching date
          datasets.forEach((obj) => {
            if (obj.label === entry.item_name) {
              console.log('pushing new value to obj');
              obj.data[i] = entry.daily_weight;
            }
          });
        }
      }
      // console.log(i, j, datasets);
    });
  });

  datasets.sort(compare);
};
