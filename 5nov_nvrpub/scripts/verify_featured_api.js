const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/books/featured?limit=5',
  method: 'GET',
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.error('Error parsing JSON:', e);
      console.log('Raw data:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Error fetching API:', error);
});

req.end();
