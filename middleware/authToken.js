const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function authToken(req, res, next) {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ error: 'Missing access token.' });
        }
        const accessToken = token.replace('Bearer ', '');

        jwt.verify(accessToken, process.env.JWT_SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid access token.' });
            }
            const user = await User.findById(decoded.userId);
            if (!user || user.rememberToken !== accessToken) {
                return res.status(401).json({ error: 'Invalid access token.' });
            }
            req.decoded = decoded;
            next();
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

module.exports = authToken;
