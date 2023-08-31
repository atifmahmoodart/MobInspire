const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const userLoginValidation = require('../validations/user/userLoginValidation')
const sendOtpValidation = require('../validations/user/sendOtpValidation');
const veifyOtpValidation = require('../validations/user/verifyOtpValidation');
const userRegisterValidation = require('../validations/user/userRegisterValidation');
const resetPasswordValidation = require('../validations/user/resetPasswordValidation');
const createUserValidation = require('../validations/user/createUserValidation');

router.post('/sendOTP', sendOtpValidation, userController.sendOTP);

router.post('/verifyOTP', veifyOtpValidation, userController.verifyOTP);

router.post('/register', userRegisterValidation, userController.register);

router.post('/login', userLoginValidation, userController.login);

router.post('/sendForgotPasswordOTP', sendOtpValidation, userController.sendForgotPasswordOTP);

router.post('/resetPassword', resetPasswordValidation, userController.resetPassword);

router.get('/readUser', authMiddleware(['READ USER']), userController.readUser);

module.exports = router;
