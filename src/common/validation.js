export let handleValidation = (formValues, entryWeights, items) => {
  console.log('---------------------');
  let err = [];
  if (!formValues.created) {
    err.push('A date is missing');
  }
  if (!formValues.source_id) {
    err.push('A source is missing');
  }
  if (entryWeights[0].item_id === '' && entryWeights[0].weight === '') {
    err.push('There are no entries to submit');
  } else {
    for (let i = 0; i < entryWeights.length; i++) {
      const entry = entryWeights[i];
      if (entry.item_id !== '') {
        if (entry.weight === '') {
          let isMissingItem = items.find(
            ({ item_id }) => item_id === Number(entry.item_id)
          );
          err.push(`${isMissingItem.name} is missing a weight`);
        }
      }
      if (entry.weight !== '') {
        if (entry.item_id === '') {
          err.push(`Which item weighs ${entry.weight} kg?`);
        }
      }
    }
  }

  return err;
};