const Joi = require('joi');

const {USER, ADMIN, MANAGER} = require('../config/constans');

const updateValidator = Joi.object({
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
