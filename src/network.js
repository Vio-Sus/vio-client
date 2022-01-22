import axios from 'axios';

export async function getSources() {
  return await axios.get('/api/sources');
}
