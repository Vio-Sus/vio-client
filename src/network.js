import axios from 'axios';

export async function getSources() {
  return await axios.get('/api/sources');
}
export async function getItems() {
  return await axios.get('/api/items');
}
export async function getListOfEntries() {
  return await axios.get('/api/getEntries');
}
