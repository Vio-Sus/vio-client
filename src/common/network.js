import axios from 'axios';

export async function getLoggedInUser() {
  return (await axios.get('/api/profile')).data;
}
export async function getSources() {
  return (await axios.get('/api/sources')).data;
}
export async function getSource() {
  return (await axios.get('/api/source')).data;
}

// items
export async function getItems() {
  return (await axios.get('/api/items')).data;
}
export async function updateItem(itemId, formContent) {
  return await axios.put(`/api/items/${itemId}`, { data: formContent });
}
export async function postItem(formContent) {
  return (await axios.post('/api/items', { data: formContent })).data;
}

// entries
export async function getListOfEntries() {
  return (await axios.get('/api/entries')).data;
}
export async function getListOfEntriesSource() {
  return (await axios.get('/api/entriesSource')).data;
}
export async function getEntriesByDateRange(startDate, endDate) {
  console.log('getEntriesByDateRange-------------');
  return (await axios.get(`/api/entries/${startDate}/${endDate}`)).data;
}
export async function postEntries(formContent) {
  return (await axios.post('/api/entries', { data: formContent })).data;
}
export async function getEntry(entryId) {
  return (await axios.get(`/api/entries/${entryId}`)).data;
}
export async function updateEntry(entryId, formContent) {
  return await axios.put(`/api/entries/${entryId}`, { data: formContent });
}
export async function deleteEntry(entryId) {
  return (await axios.delete(`/api/entries/${entryId}`)).data;
}

// sources
export async function postSource(formContent) {
  return (await axios.post('/api/sources', { data: formContent })).data;
}
export async function updateSource(sourceId, formContent) {
  return await axios.put(`/api/sources/${sourceId}`, { data: formContent });
}

// totals
export async function getTotalWeights(startDate, endDate) {
  return (await axios.get(`/api/totals/${startDate}/${endDate}`)).data;
}
