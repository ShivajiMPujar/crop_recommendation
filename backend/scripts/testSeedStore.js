const axios = require('axios');

async function testSeeds() {
  try {
    const res = await axios.get('http://localhost:5000/api/seeds', { params: { cropName: 'Groundnut', district: 'Tumakuru' } });
    console.log('Seeds status:', res.status);
    console.log('Seeds data sample:', JSON.stringify(res.data.seeds?.slice(0,3), null, 2));
  } catch (err) {
    console.error('Seeds endpoint error:', err.message);
  }
}

async function testStores() {
  try {
    const res = await axios.get('http://localhost:5000/api/stores', { params: { district: 'Dharwad' } });
    console.log('Stores status:', res.status);
    console.log('Stores data sample:', JSON.stringify(res.data.stores?.slice(0,3), null, 2));
  } catch (err) {
    console.error('Stores endpoint error:', err.message);
  }
}

(async () => {
  await testSeeds();
  await testStores();
})();
