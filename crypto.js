const crypto = require('crypto');

const generateJWTSecretKey = () => {
  if (process.env.JWT_SECRET_KEY) {
    return process.env.JWT_SECRET_KEY;
  } else {
    const newJWTSecretKey = crypto.randomBytes(32).toString('hex');
    console.log('Generated new JWT_SECRET_KEY:', newJWTSecretKey);
    return newJWTSecretKey;
  }
};

const JWT_SECRET_KEY = generateJWTSecretKey();

module.exports = JWT_SECRET_KEY;
