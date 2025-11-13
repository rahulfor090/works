// Test script to verify annual prices API with database integration
const http = require('http');

const testData = {
  code: 'TEST001',
  title: 'Test Annual Price',
  description: 'This is a test annual price for database integration',
  category: 'Individual',
  type: 'Period based',
  journal: 'All Journals',
  format: 'Digital',
  region: 'India',
  currency: 'INR',
  price: 9999,
  discountPrice: 7999,
  isActive: true,
};

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('Starting Annual Prices API tests...\n');

  try {
    // Test 1: GET all prices
    console.log('Test 1: GET /api/admin/annual-prices');
    const getResult = await makeRequest('GET', '/api/admin/annual-prices');
    console.log(`Status: ${getResult.status}`);
    console.log(`Response:`, getResult.data);
    console.log('');

    // Test 2: POST new price
    console.log('Test 2: POST /api/admin/annual-prices');
    const postResult = await makeRequest('POST', '/api/admin/annual-prices', testData);
    console.log(`Status: ${postResult.status}`);
    console.log(`Response:`, postResult.data);
    
    if (postResult.data.id) {
      const newId = postResult.data.id;
      console.log(`Created price with ID: ${newId}\n`);

      // Test 3: PUT (update) the created price
      console.log(`Test 3: PUT /api/admin/annual-prices/${newId}`);
      const updateData = { ...testData, title: 'Updated Test Annual Price', price: 10999 };
      const putResult = await makeRequest('PUT', `/api/admin/annual-prices/${newId}`, updateData);
      console.log(`Status: ${putResult.status}`);
      console.log(`Response:`, putResult.data);
      console.log('');

      // Test 4: DELETE the created price
      console.log(`Test 4: DELETE /api/admin/annual-prices/${newId}`);
      const deleteResult = await makeRequest('DELETE', `/api/admin/annual-prices/${newId}`);
      console.log(`Status: ${deleteResult.status}`);
      console.log(`Response:`, deleteResult.data);
    }

    console.log('\n✅ All tests completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test error:', error);
    process.exit(1);
  }
}

// Wait for server to be ready
setTimeout(runTests, 1000);
