const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userLoginValidation = require('../validations/user/userLoginValidation')
const sendOtpValidation = require('../validations/user/sendOtpValidation');
const veifyOtpValidation = require('../validations/user/verifyOtpValidation');
const userRegisterValidation = require('../validations/user/userRegisterValidation');

router.post('/sendOTP', sendOtpValidation, userController.sendOTP);

router.post('/verifyOTP', veifyOtpValidation, userController.verifyOTP);

router.post('/register', userRegisterValidation, userController.register);

router.post('/login', userLoginValidation, userController.login);

module.exports = router;
