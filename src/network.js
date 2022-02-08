import axios from 'axios';

export async function getSources() {
  return await axios.get('/api/sources');
}
export async function getItems() {
  return await axios.get('/api/items');
}
export async function getListOfEntries() {
  return await axios.get('/api/entries');
}
export async function postEntries(data) {
  return await axios.post('/api/entries', data);
}
export async function getEntry(entryId) {
  return await axios.get(`/api/entry/${entryId}`);
}
export async function updateEntry(entryId, formContent) {
  return await axios.put(`/api/entry/${entryId}`, { data: formContent });
}
