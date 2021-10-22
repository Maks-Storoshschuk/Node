const {Schema, model} = require('mongoose');

const {tokenTypeEnum} = require('../config');

const actionForgotSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: tokenTypeEnum.ACTION_FORGOT
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    }
}, {timestamps: true});

module.exports = model('actionForgot', actionForgotSchema);
