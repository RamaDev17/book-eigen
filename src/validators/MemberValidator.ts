import Joi from "joi";

export const createMemberValidation = Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required(),
})

export const updateMemberValidation = Joi.object({
    code: Joi.string().optional(),
    name: Joi.string().optional(),
})