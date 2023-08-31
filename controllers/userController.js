const userService = require('../services/userServices');
const responseCodes = require('../constants/responseCodes');
const responseMessages = require('../constants/responseMessages');

const userController = {

    verifyOTP: async (req, res) => {
        try {
            const { email, otp } = req.body;
            const result = await userService.verifyOTP(email, otp);
            res.status(responseCodes.SUCCESS).json({
                message: responseMessages.OTP_VERIFICATION_SUCCESSFUL,
                data: result,
            });
        } catch (error) {
            if (error.message == responseMessages.INVALID_OTP) {
                res.status(responseCodes.BAD_REQUEST).json({ message: responseMessages.INVALID_OTP });
            } else {
                res.status(responseCodes.SERVER_ERROR).json({ error: responseMessages.ERROR });
            }
        }
    },

    register: async (req, res) => {
        try {
            const userData = req.body;
            const result = await userService.register(userData);
            res.status(responseCodes.CREATED).json({
                message: responseMessages.OTP_SENT_TO_EMAIL,
                data: result,
            });
        } catch (error) {
            console.warn(error)
            if (error.message == responseMessages.USER_ALREADY_VERIFIED) {
                res.status(responseCodes.CONFLICT).json({ message: responseMessages.USER_ALREADY_VERIFIED });
            } else if (error.message == responseMessages.OTP_RECENTLY_SENT) {
                res.status(responseCodes.TOO_MANY_REQUESTS).json({ message: responseMessages.OTP_RECENTLY_SENT });
            } else {
                res.status(responseCodes.SERVER_ERROR).json({ error: responseMessages.ERROR });
            }
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await userService.login(email, password);
            res.status(responseCodes.SUCCESS).json({
                message: responseMessages.LOGIN_SUCCESSFUL,
                data: result,
            });
        } catch (error) {
            if (error.message == responseMessages.USER_NOT_FOUND) {
                res.status(responseCodes.NOT_FOUND).json({ message: responseMessages.USER_NOT_FOUND });
            } else if (error.message == responseMessages.OTP_NOT_VERIFIED) {
                res.status(responseCodes.BAD_REQUEST).json({ message: responseMessages.OTP_NOT_VERIFIED });
            } else if (error.message == responseMessages.INVALID_CREDENTIALS) {
                res.status(responseCodes.UNAUTHORIZED).json({ message: responseMessages.INVALID_CREDENTIALS });
            } else {
                res.status(responseCodes.SERVER_ERROR).json({ error: 'Something went wrong.' });
            }
        }
    },

    getUsers: async (req, res) => {
        try {
            const userId = req.decoded.userId;
            const filter = req.body.filter;
            const users = await userService.getUsers(filter, userId);
            res.status(responseCodes.SUCCESS).json({
                message: responseMessages.USERS_FOUND_SUCCESSFULLY,
                data: users,
            });
        } catch (error) {
            if (error.message == responseMessages.USERS_NOT_FOUND) {
                res.status(responseCodes.NOT_FOUND).json({ message: responseMessages.USERS_NOT_FOUND });
            } else if (error.message == responseMessages.INVALID_USER_TYPE) {
                res.status(responseCodes.BAD_REQUEST).json({ message: responseMessages.INVALID_USER_TYPE });
            } else {
                res.status(responseCodes.SERVER_ERROR).json({ error: responseMessages.ERROR });
            }
        }
    },

    searchByName: async (req, res) => {
        try {
            const searchQuery = req.params.query;
            const users = await userService.searchByName(searchQuery);

            res.status(responseCodes.SUCCESS).json({
                message: responseMessages.USERS_FOUND_SUCCESSFULLY,
                data: users,
            });
        } catch (error) {
            if (error.message == responseMessages.USERS_NOT_FOUND) {
                res.status(responseCodes.NOT_FOUND).json({ message: responseMessages.USERS_NOT_FOUND });
            } else {
                res.status(responseCodes.SERVER_ERROR).json({ error: responseMessages.ERROR });
            }
        }
    },
};

module.exports = userController;
