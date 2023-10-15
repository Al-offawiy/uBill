const payment = require('../models/paymentModel');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
// const Flutterwave = require('flutterwave-node-v3');
// const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

function trnscRef(length) {
  const numbers = '0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    code += numbers.charAt(randomIndex);
  }
  return code;
}

 
    
  
     var config = {
      'method': 'POST',
       'url': 'https://api.flutterwave.com/v3/bills',
       'headers': {
         'Authorization': `Bearer ${process.env.SECRET_KEY}`,
         'Content-Type': 'application/json'
       },
      data:{
        "country": "NG",
        "recurrence": "ONCE",
        "type": "EKEDC PREPAID TOPUP",
         "biller_name": "EKEDC PREPAID TOPUP",
        "reference": "",
        "customer": "1101160434535",
        "amount": 100,
     }
     
     };



const buy =  async () => {
//   try {
//     const response = await axios(config)
//     console.log(JSON.stringify(response.data));
// }catch (error) {
//     console.log(error)
// }
}

  buy()


module.exports={
  buy
}