export let handleValidation = (formValues, entryWeights, items) => {
  console.log('---------------------');
  let err = [];
  if (!formValues.date) {
    err.push('A date is missing');

  }
  if (!formValues.source) {
    err.push('A source is missing');

  }
  if (entryWeights[0].item === '' && entryWeights[0].weight === '') {
    err.push('There are no entries to submit');

  } else {
    for (let i = 0; i < entryWeights.length; i++) {
      const entry = entryWeights[i];
      if (entry.item !== '') {
        if (entry.weight === '') {
          let isMissingItem = items.find(
            ({ item_id }) => item_id === Number(entry.item)
          );
          err.push(`${isMissingItem.name} is missing a weight`);

        }
      }
      if (entry.weight !== '') {
        if (entry.item === '') {
          err.push(`Which item weighs ${entry.weight} kg?`);

        }
      }
    }
  }


  return err;
};

