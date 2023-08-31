const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
    otp: String,
    lastOtpSent: Date,
    emailVerifiedAt: Date,
}, {
    timestamps: {
        currentTime: () => new Date().getTime() + (5 * 60 * 60 * 1000)
    }
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
