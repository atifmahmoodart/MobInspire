const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
    password: { type: String, required: true },
    userTypeId: { type: String },
}, {
    timestamps: {
        currentTime: () => new Date().getTime() + (5 * 60 * 60 * 1000)
    }
},);


const User = mongoose.model('User', userSchema);
module.exports = User;
