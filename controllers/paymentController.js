const payment = require('../models/paymentModel');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const username = 'fawazmusty247@gmail.com'; // email address (sandbox@vtpass.com)
const password = 'Y.KkPhf8FxW@w82'; // password (sandbox)
const host = ' https://sandbox.vtpass.com/api/pay';


function generateTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  // JavaScript months are zero-based, so add 1 to get the current month.
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  
  // Create a string with the desired format, e.g., "YYYYMMDDHHMM".
  const timestamp = `${year}${month}${day}${hour}${minute}`;
  
  return timestamp;
}

const buy = async (req, res) => {
  try {
    const billtrnsc = await axios({
      method: 'post',
      url: host,
      auth: {
        username: username,
        password: password
      },
      data: {
        request_id: `${generateTimestamp()}-UB`, // unique for every transaction from your platform
        serviceID: req.body.serviceID, // Replace with the actual service ID
        billersCode: req.body.billersCode, // Replace with the actual biller's code
        variation_code: 'prepaid', // Replace with the actual variation code
        amount: req.body.amount, // Replace with the actual amount
        phone: req.body.phone, // Replace with the actual recipient
      },
    });

    const trnscRef = billtrnsc.data;
    res.send(trnscRef.purchased_code);

    const prodInfo = {
      product_name: trnscRef.content.transactions.product_name,
      amount: trnscRef.content.transactions.amount,
      transactionId: trnscRef.content.transactions.transactionId,
      status: trnscRef.content.transactions.status,
      unique_element: trnscRef.content.transactions.unique_element,
      purchased_code: trnscRef.purchased_code,
      by:req.user
    };

    const saveRef = await payment.create(prodInfo);

    // Handle success or further operations here

  } catch (error) {
    console.log(error.message);
    res.redirect('/failed')
    //Handle the error as needed
  }
};


module.exports={
  buy
}