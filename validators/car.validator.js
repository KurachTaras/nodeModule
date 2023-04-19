const joi = require("joi");

module.exports = {
    newCarValidator: joi.object({
        model: joi.string().min(2).max(100).required().default(''),
        year: joi.number().integer().min(1960).max(2023),
        price: joi.number().integer().min(1000).max(100000000),
    }),

    editCarValidator: joi.object({
        model: joi.string().min(2).max(100).required().default(''),
        year: joi.number().integer().min(1960).max(2023),
        price: joi.number().integer().min(1000).max(100000000),
    }),
}