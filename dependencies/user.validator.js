const Joi = require('joi');

const {emailRegExp, passwordRegExp, USER, ADMIN, MANAGER} = require('../config/constans');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(emailRegExp)
        .trim()
        .required(),
    role: Joi
        .string()
        .allow(USER, ADMIN, MANAGER),
    password: Joi
        .string()
        .trim()
        .regex(passwordRegExp)
        .required(),
});

module.exports = {
    createUserValidator
};
