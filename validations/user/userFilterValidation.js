const responseCodes = require('../../constants/responseCodes');
const responseMessages = require('../../constants/responseMessages');

function userFilterValidation(req, res, next) {
    const validFilters = ['verified', 'unverified', 'all'];
    const filter = req.body.filter;
    if (!filter) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.FILTER_REQUIRED });
    }
    if (!filter || !validFilters.includes(filter)) {
        return res.status(responseCodes.BAD_REQUEST).json({ error: responseMessages.INVALID_FILTER });
    }
    next();
}

module.exports = userFilterValidation;
