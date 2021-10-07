const { Schema, model } = require('mongoose');

const userRoles=require ('../config/constans');

const userSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: false,
        unique: true,
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    role:{
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    },
    password:{
        type: String,
        trim:true,
        required: true
    }
}, {timestamps: true });

module.exports = model('user',userSchema);
