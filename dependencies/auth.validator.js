const Joi = require('joi');

const {emailRegExp, passwordRegExp,} = require('../config/constans');

const authValidator = Joi.object({
    email: Joi
        .string()
        .regex(emailRegExp)
        .trim()
        .required(),
    password: Joi
        .string()
        .trim()
        .allow(passwordRegExp)
        .required()
});

module.exports = {
    authValidator
};
