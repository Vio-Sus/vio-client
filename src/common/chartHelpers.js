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

/******
// Things to do to make a dataset that looks like this for EVERY SOURCE:
[
  {
    label: 'PAper Cups', // item name
    data: [5.55, 5.00, 20.00], // weights
    borderColor: 'rgba(255, 99, 132, 0.5)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  },
  {
    label: 'Coffee Chafs',
    data: [1, 2, 3, 4, 5, 6, 7, 8],
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
  },
];

Graph component needs: label, data, rgba colour.

1. Filter api result so info is separated by source name
2. Filter result by itemName
3. Set label as itemName
4. Make an array of weights for each item

****/
export const generateDataset = (input, datesArray) => {
  // returns empty array if given empty array
  if (input.length === 0) {
    return [];
  }
  let dataThing;
  // datesArray.forEach((date, i) => {
  //   // if date === input date, push input data
  //   // else push comma (push null/undefined?)
  // });
  //if dates label doesnt have entry, push comma (empty array thingy)
  // data[0] = somethign
  // date[2] = something
  // [something,,something]

  let items = []; // ['cafe 1', 'cafe2']
  input.forEach((entry) => {
    // let smt = dates.find((date) => item.itemName === entry.itemName);
    //loop items
    // for (let i = 0; i < items.length; i++) {
    // if items[i].itemName = entry.itemName
    let item = items.find((item) => item.itemName === entry.itemName);
    if (item) {
      item.data.push(Number(entry.totalWeight));
    } else {
      // else items.push({ itemName: '', data: [] })
      // then set item[i].data.push(entry.totalWeight)
      items.push({
        itemName: entry.itemName,
        data: [Number(entry.totalWeight)],
      });
    }
  });

  let structure = [];

  items.forEach((item) => {
    structure.push({
      label: item.itemName, // item name
      data: item.data, // weights
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    });
  });

  // input.forEach((item) => {
  //   if (item.nam) {
  //   }

  //   data.push(Number(item.totalWeight));
  // });

  return structure;
};

// function that returns an array of objects for a given source
export const filterEntriesBySource = (input) => {
  let sources = {}; // ['cafe 1', 'cafe2']
  input.forEach((entry) => {
    // let source = sources.find(
    //   (source) => source.sourceName === entry.sourceName
    // );
    let source = Object.keys(sources);

    let found = source.find((key) => key === entry.sourceName);
    console.log('source:', source);
    console.log('entry.sourcename', entry.sourceName);
    console.log('found: ', found);
    if (found) {
      sources[entry.sourceName] = [
        ...sources[entry.sourceName],
        {
          itemName: entry.itemName,
          date: entry.date,
          totalWeight: entry.totalWeight,
        },
      ];
    } else {
      // else items.push({ itemName: '', data: [] })
      // then set item[i].data.push(entry.totalWeight)
      sources[entry.sourceName] = [
        {
          itemName: entry.itemName,
          date: entry.date,
          totalWeight: entry.totalWeight,
        },
      ];
    }
  });
  return sources;
};
