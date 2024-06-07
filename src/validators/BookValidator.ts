import Joi from "joi";

export const createBookValidation = Joi.object({
    code: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    stock: Joi.number().required(),
})

export const updateBookValidation = Joi.object({
    code: Joi.string().optional(),
    title: Joi.string().optional(),
    author: Joi.string().optional(),
    stock: Joi.number().optional(),
})