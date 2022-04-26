import axios from 'axios';

export async function getLoggedInUser() {
  return (await axios.get('/api/profile')).data;
}

export async function updateAccountType(formContent) {
  //change the account_type_id
  return await axios.put(`/api/profile`, { data: formContent });
}

export async function getSources() {
  return (await axios.get('/api/sources')).data;
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
export async function getEntriesByDateRange(startDate, endDate) {
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
  try {
    const res = await axios.post('/api/sources', { data: formContent });
    console.log('res in network' + res);
  } catch (err) {
    console.log('err in network' + err);
  }
}

export async function updateSource(sourceId, formContent) {
  return await axios.put(`/api/sources/${sourceId}`, { data: formContent });
}
// check for duplicates
export async function checkSourceEmail(email) {
  try {
    const data = await axios.post('/api/sources/check-email', { email });
    return data;
  } catch (err) {
    console.log(err);
  }
}
// check for duplicates
export async function checkSourcePhone(phoneNumber) {
  try {
    const data = await axios.post('/api/sources/check-phone', { phoneNumber });
    return data;
  } catch (err) {
    console.log(err);
  }
}

// totals
export async function getTotalWeights(startDate, endDate) {
  return (await axios.get(`/api/totals/${startDate}/${endDate}`)).data;
}

// graphs
export async function getGraphDataset(startDate, endDate) {
  let res = await axios.get(`/api/graph/line/${startDate}/${endDate}`);
  return res;
  // return (await axios.get(`/api/graph/line/${startDate}/${endDate}`)).data;
}
