const axios = require('axios');

async function testSchemes() {
    try {
        console.log("Testing /api/schemes...");
        const response = await axios.get('http://localhost:5000/api/schemes');
        console.log("Status:", response.status);
        console.log("Data length:", response.data.length);
        if (response.data.length > 0) {
            console.log("First scheme:", response.data[0]);
        }
    } catch (error) {
        console.error("Error testing schemes:", error.message);
    }
}

testSchemes();
