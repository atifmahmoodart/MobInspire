const userService = require('../services/userServices');
const responseCodes = require('../constants/responseCodes');
const responseMessages = require('../constants/responseMessages');

const userController = {
  sendOTP: async (req, res) => {
    try {
      const { email } = req.body;
      const result = await userService.sendOTP(email);
      res.status(responseCodes.SUCCESS).json({
        message: responseMessages.OTP_SENT_TO_EMAIL,
        data: result,
      });
    } catch (error) {
      if (error.message == responseMessages.USER_ALREADY_VERIFIED) {
        res.status(responseCodes.CONFLICT).json({ message: responseMessages.USER_ALREADY_VERIFIED });
      } else if (error.message == responseMessages.OTP_RECENTLY_SENT) {
        res.status(responseCodes.TOO_MANY_REQUESTS).json({ message: responseMessages.OTP_RECENTLY_SENT });
      } else {
        res.status(responseCodes.SERVER_ERROR).json({ error: 'Something went wrong.' });
      }
    }
  },

//   verifyOTP: async (req, res) => {
//     try {
//       const { email, otp } = req.body;
//       const result = await userService.verifyOTP(email, otp);
//       res.status(responseCodes.SUCCESS).json({
//         message: responseMessages.OTP_VERIFICATION_SUCCESSFUL,
//         data: result,
//       });
//     } catch (error) {
//       if (error.message == responseMessages.INVALID_OTP) {
//         res.status(responseCodes.BAD_REQUEST).json({ message: responseMessages.INVALID_OTP });
//       } else {
//         res.status(responseCodes.SERVER_ERROR).json({ error: 'Something went wrong.' });
//       }
//     }
//   },

//   register: async (req, res) => {
//     try {
//       const userData = req.body;
//       const result = await userService.register(userData);
//       res.status(responseCodes.CREATED).json({
//         message: responseMessages.USER_REGISTERED,
//         data: result,
//       });
//     } catch (error) {
//       console.warn(error)
//       if (error.message == responseMessages.OTP_NOT_VERIFIED) {
//         res.status(responseCodes.FORBIDDEN).json({ message: responseMessages.OTP_NOT_VERIFIED });
//       } else {
//         res.status(responseCodes.SERVER_ERROR).json({ error: 'Something went wrong.' });
//       }
//     }
//   },

//   login: async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const result = await userService.login(email, password);
//       res.status(responseCodes.SUCCESS).json({
//         message: responseMessages.LOGIN_SUCCESSFUL,
//         data: result,
//       });
//     } catch (error) {
//       console.warn(error)//
//       if (error.message == responseMessages.USER_NOT_FOUND) {
//         res.status(responseCodes.NOT_FOUND).json({ message: responseMessages.USER_NOT_FOUND });
//       } else if (error.message == responseMessages.INVALID_CREDENTIALS) {
//         res.status(responseCodes.UNAUTHORIZED).json({ message: responseMessages.INVALID_CREDENTIALS });
//       } else {
//         res.status(responseCodes.SERVER_ERROR).json({ error: 'Something went wrong.' });
//       }
//     }
//   },

//   sendForgotPasswordOTP: async (req, res) => {
//     try {
//       const { email } = req.body;
//       const result = await userService.sendForgotPasswordOTP(email);
//       res.status(responseCodes.SUCCESS).json({
//         message: responseMessages.OTP_SENT_TO_EMAIL,
//         data: result,
//       });
//     } catch (error) {
//       if (error.message == responseMessages.USER_NOT_FOUND) {
//         res.status(responseCodes.NOT_FOUND).json({ message: responseMessages.USER_NOT_FOUND });
//       } else if (error.message == responseMessages.OTP_RECENTLY_SENT) {
//         res.status(responseCodes.TOO_MANY_REQUESTS).json({ message: responseMessages.OTP_RECENTLY_SENT });
//       } else {
//         res.status(responseCodes.SERVER_ERROR).json({ error: 'Something went wrong.' });
//       }
//     }
//   },

//   resetPassword: async (req, res) => {
//     try {
//       const { email, otp, newPassword } = req.body;
//       const result = await userService.resetPassword(email, otp, newPassword);
//       res.status(responseCodes.SUCCESS).json({
//         message: responseMessages.PASSWORD_RESET_SUCCESSFUL,
//         data: result,
//       });
//     } catch (error) {
//       if (error.message == responseMessages.INVALID_OTP) {
//         res.status(responseCodes.UNAUTHORIZED).json({ message: responseMessages.INVALID_OTP });
//       } else if (error.message == responseMessages.OTP_EXPIRED) {
//         res.status(responseCodes.BAD_REQUEST).json({ message: responseMessages.OTP_EXPIRED });
//       } else {
//         res.status(responseCodes.SERVER_ERROR).json({ error: 'Something went wrong.' });
//       }
//     }
//   },

//   readUser: async (req, res) => {
//     try {
//       const userId = req.decoded.userId;
//       const result = await userService.readUser(userId);
//       res.status(responseCodes.SUCCESS).json({
//         message: responseMessages.USERS_FOUND,
//         data: result,
//       });
//     } catch (error) {
//       if (error.message == responseMessages.PERMISSION_DENIED) {
//         res.status(responseCodes.FORBIDDEN).json({ message: responseMessages.PERMISSION_DENIED });
//       } else if (error.message == responseMessages.USERS_NOT_FOUND) {
//         res.status(responseCodes.NOT_FOUND).json({ message: responseMessages.USERS_NOT_FOUND });
//       } else {
//         res.status(responseCodes.SERVER_ERROR).json({ error: 'Something went wrong.' });
//       }
//     }
//   },
};

module.exports = userController;
