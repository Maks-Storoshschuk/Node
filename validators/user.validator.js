const Joi = require('joi');

const {constants, regExp} = require('../config');

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
        .regex(regExp.emailRegExp)
        .trim()
        .required(),
    role: Joi
        .string()
        .allow(constants.valueOf()),
    password: Joi
        .string()
        .trim()
        .regex(regExp.passwordRegExp)
        .required(),
});

module.exports = {
    createUserValidator
};
