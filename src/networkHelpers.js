export async function calculateTotalsByItem(objs) {
  let outputArray = []; // [{item: "coffee"}]
  for (let obj of objs) {
    for (let row of obj.totals) {
      console.log('rowwwww', row);
      // iterate across rows from API
      // destructure API row
      let { item, totalWeight } = row;
      // finds the output object in outputArray, or else finds null
      let outputObject = null;
      for (let oo of outputArray) {
        if (oo.item === item) {
          outputObject = oo;
        }
        console.log('OO exists?: ', outputObject);
        // add weight here
        outputArray.find(lineItem => lineItem.totalWeight)
      }
      // aw shitcrap, we didn't find it.  better make it.
      if (outputObject === null) {
        outputObject = { item: item, totalWeight: Number(totalWeight) };
        // it's made.  now make sure it's healthy in its healthy home
        console.log('new output obj: ', outputObject);
        console.log('~~~~~~~~~', outputArray);
        outputArray.push(outputObject);
        console.log('~~~~~~~~~', outputArray);
      }
      // outputObject.totalWeight += Number(totalWeight);
    }
  }
  console.log('objss', objs);
  return outputArray;
}
