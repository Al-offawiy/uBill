const https = require('https')
const querystring = require('querystring');

if (process.argv[2]) {
  const reference = process.argv[2];


const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/transaction/verify/'+reference,
  method: 'GET',
  headers: {
    Authorization: 'Bearer sk_test_3b254057b552c4fa7e558ca2e9542c83ed51eab1'
  }
}


const req = https.request(options, res => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  });

  res.on('end', () => {
    console.log(JSON.parse(data))
  })
}).on('error', error => {
  console.error(error)
})


} else {
  console.error('Reference not provided');
}

module.exports = {req}