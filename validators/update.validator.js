const Joi = require('joi');

const updateValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
});

module.exports = {
    updateValidator
};
