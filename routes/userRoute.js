const express = require('express')

const userController = require('../controllers/userController')
const router = express.Router();

//user signUp
router.post('/user/signup', userController.signup);
  
     //user login
      router.post('/user/login', userController.login )

//user logout
router.get('/user/logout', userController.logout)

router.post('/user/CRM', userController.msgSaver)
  module.exports = router;