const Joi = require('joi');
const {regExp} = require('../config');

const newPasswordValidator = Joi.object({
    newPassword: Joi
        .string()
        .trim()
        .regex(regExp.passwordRegExp)
        .required()
});

module.exports = {
    newPasswordValidator
};
