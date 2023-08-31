const responseCodes = require('../../constants/responseCodes');
const responseMessages = require('../../constants/responseMessages');
const User = require('../../models/userModel');

async function userRegisterValidation(req, res, next) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^\+92-\d{3}-\d{7}$/;
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    const email = await User.find({ email: req.body.email });
    const phone = await User.find({ phoneNumber: req.body.phoneNumber });
    const cnic = await User.find({ cnic: req.body.cnic });

    if (!req.body.firstName) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.FIRST_NAME });
    }

    if (!req.body.lastName) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.LAST_NAME });
    }

    if (!req.body.email) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.EMAIL_REQUIRED });
    }

    if (!req.body.phoneNumber) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.PHONE_NUMBER });
    }

    if (!req.body.cnic) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.CNIC });
    }

    if (!req.body.password) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.PASSWORD_REQUIRED });
    }

    if (!emailRegex.test(req.body.email)) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.INVALID_EMAIL });
    }

    if (!phoneRegex.test(req.body.phoneNumber)) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.INVALID_PHONE });
    }

    if (!cnicRegex.test(req.body.cnic)) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.INVALID_CNIC });
    }

    if (email.length !== 0) {
        return res.status(responseCodes.CONFLICT).json({ error: responseMessages.EMAIL_ALREADY_EXIST });
    }

    if (phone.length !== 0) {
        return res.status(responseCodes.CONFLICT).json({ error: responseMessages.PHONE_ALREADY_EXIST });
    }

    if (cnic.length !== 0) {
        return res.status(responseCodes.CONFLICT).json({ error: responseMessages.CNIC_ALREADY_EXIST });
    }

    next();
}

module.exports = userRegisterValidation;
