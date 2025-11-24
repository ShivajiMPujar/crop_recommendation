const axios = require('axios');

const body = {
  soilType: 'Red Soil',
  district: 'Tumakuru',
  temperature: 28,
  rainfall: 600
};

async function test() {
  const baseUrls = ['http://localhost:5000', 'http://localhost:5001', 'http://localhost:5002'];
  for (const base of baseUrls) {
    try {
      console.log(`Trying ${base}/api/crops/recommend`);
      const res = await axios.post(`${base}/api/crops/recommend`, body, { timeout: 3000 });
      console.log('Status:', res.status);
      console.log('Response data:', JSON.stringify(res.data, null, 2));
      return;
    } catch (err) {
      console.error(`Failed on ${base}:`, err.message.replace(/\n/g, ' '));
    }
  }
  console.error('All attempts failed. Is the backend running?');
}

test();
