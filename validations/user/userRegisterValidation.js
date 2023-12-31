const responseCodes = require('../../constants/responseCodes');
const responseMessages = require('../../constants/responseMessages');
const User = require('../../models/userModel');

async function userRegisterValidation(req, res, next) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const email = await User.find({ email: req.body.email });

    if (!req.body.name) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.NAME });
    }

    if (!req.body.email) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.EMAIL_REQUIRED });
    }

    if (!req.body.password) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.PASSWORD_REQUIRED });
    }

    if (!req.body.userType) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.USER_TYPE_REQUIRED });
    }

    if (!emailRegex.test(req.body.email)) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.INVALID_EMAIL });
    }

    next();
}

module.exports = userRegisterValidation;
