const Joi = require('joi');

const {emailRegExp, passwordRegExp, USER, ADMIN, MANAGER} = require('../config/constans');

const updateValidator = Joi.object({
    email: Joi
        .string()
        .regex(emailRegExp)
        .trim(),
    password: Joi
        .string()
        .trim()
        .allow(passwordRegExp),
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),
    role: Joi
        .string()
        .allow(USER, ADMIN, MANAGER),
});

module.exports = {
    updateValidator
};
