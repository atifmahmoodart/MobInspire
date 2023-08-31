const responseCodes = require('../../constants/responseCodes');
const responseMessages = require('../../constants/responseMessages');

function veifyOtpValidation(req, res, next) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!req.body.email) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.EMAIL_REQUIRED });
    }

    if (!req.body.otp) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.OTP_REQUIRED });
    }

    if (!emailRegex.test(req.body.email)) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.INVALID_EMAIL });
    }

    next();
}

module.exports = veifyOtpValidation;
