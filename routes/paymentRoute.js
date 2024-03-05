const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

router.post('/buyElectricity', paymentController.buy)

// router.get('/admin/Transactions', paymentController.allTrn)

// router.get('/admin/Transaction', paymentController.oneTrn)



module.exports = router;
