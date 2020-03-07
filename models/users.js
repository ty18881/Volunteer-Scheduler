const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:  { type: String, required: true },
    password:  { type: String, required: true },
    role: String
}, {timestamps: true});

// this tells mongoose what to name the new collection if/when it creates one.
const User = mongoose.model('User', userSchema);

module.exports = User;