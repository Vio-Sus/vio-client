export const findItem = (itemId, items) => {
  return items.find(({ item_id }) => item_id === itemId);
};

export const findSource = (sourceId, sources) => {
  return sources.find(({ source_id }) => source_id === sourceId);
};
