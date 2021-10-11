const {Schema, model} = require('mongoose');

const {USER, ADMIN, MANAGER} = require('../config/constans');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    role: {
        type: String,
        default: USER,
        enum: {ADMIN, USER, MANAGER}
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
}, {timestamps: true});

module.exports = model('user', userSchema);
