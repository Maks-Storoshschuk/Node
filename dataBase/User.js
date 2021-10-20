const {Schema, model} = require('mongoose');

const {constants} = require('../config');

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
        default: constants.USER,
        enum: constants.valueOf()
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: false,
        required: true
    }
}, {timestamps: true});

module.exports = model('user', userSchema);
