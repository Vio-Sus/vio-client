import axios from 'axios';

export async function getLoggedInUser() { 
  return (await axios.get('/api/profile')).data;
}

export async function updateAccountType(formContent) {
  return await axios.put(`/api/profile`, { data: formContent });
}

export async function updateAccountProfile(formContent) {
  return await axios.put(`/api/profileCollector`, { data: formContent });
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
    return res;
  } catch (err) {
    console.log('err: ' + err);
  }
}

//Get all collectors that belong to the source
export async function getCollectors(){
  return await (await axios.get('/api/sourceCollectors')).data;
}

//Get start and end date for collectors that belong to source
export async function getEntriesByDateRangeForCollector(startDate, endDate) {
  console.log((await axios.get(`/api/sourceCollectors/${startDate}/${endDate}`)).data)
  return (await axios.get(`/api/sourceCollectors/${startDate}/${endDate}`)).data;
}



export async function updateSource(sourceId, formContent) {
  return await axios.put(`/api/sources/${sourceId}`, { data: formContent });
}

export async function getSources() {
  return (await axios.get('/api/sources')).data;
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
